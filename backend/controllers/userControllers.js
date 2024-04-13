const express = require('express')
const User = require('../schema/userSchema');
const generateToken = require('../config/generateToken');
const asyncHandler = require('express-async-handler');
const { Account } = require('../schema/bankSchema');

//@description     Get or Search all users
//@route           GET /api/v1/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { firstName: { $regex: req.query.search, $options: "i" } },
            { lastName: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send({users : users.map(user =>({
        id : user._id,
        username : user.username,
        firstName : user.firstName,
        lastName : user.lastName,
        email: user.email
    }))});
  });
  
const registerUser = asyncHandler(async (req, res) => {
    const { username, firstName, lastName, email, password } = req.body;
    if (!username || !firstName || !email || !password) {
        res.status(400)
        throw new Error("Please Enter all the Required inputs")
    }

    const userExistswithUsername = await User.findOne( { username });
    if (userExistswithUsername) {
        res.status(400)
        throw new Error("Username Already Registered")
    }
    const userExistswithEmail = await User.findOne( { email });
    if (userExistswithEmail) {
        res.status(400)
        throw new Error("Username Already Exist with This email")
    }

    
    const user = await User.create({
        username,
        firstName,
        lastName,
        email,
        password
    })
    
    const acc = await Account.create({
        userId : user._id,
        balance : Math.ceil(Math.random()*100)*10000
    })

    if (user && acc) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            FirstName: user.firstName,
            LastName: user.lastName,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {

        res.status(400);
        throw new Error("User not found");

    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400)
        throw new Error("Please Enter all the fields")
    }

    const user = await User.findOne({ $or: [{ username }, { email: username }] });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            FirstName: user.firstName,
            LastName: user.lastName,
            email: user.email,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }

})

const updateUser = asyncHandler(async (req, res) =>{
    const id = req.body.userId;
    try{
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new : true});

       if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({
            msg: "User updated successfully",
            user: updatedUser
        });
    }catch (e){
        res.status(401)
        throw new Error(`${e.message}`)
    }
})
module.exports = { registerUser, loginUser, allUsers, updateUser}