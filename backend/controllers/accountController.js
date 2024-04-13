const asyncHandler = require('express-async-handler')
const { Account } = require('../schema/bankSchema')
const { convertToFloat, convertToInt } = require('../config/currencyConverter')
const { default: mongoose } = require('mongoose')

const getBalance = asyncHandler(async (req, res) => {
    const { userId } = req.body
    try {
        console.log("request goes");
        const account = await Account.findOne({
            userId
        })
        if (!account) {
            res.status(404)
            throw new Error("Account not found")
        }
        console.log(account.balance)
        const bal = convertToFloat(account.balance)
        res.status(200).json({
            balance: bal
        })

    } catch (e) {
        res.status(401)
        throw new Error('Internal Server error')
    }
})


const transferFunds = asyncHandler(async (req, res) =>{
    const session = await mongoose.startSession()
    session.startTransaction();
    
    const {userId, amount, to} = req.body
    if(!userId || !amount || !to){
        await session.abortTransaction();
        res.status(400)
        throw new Error("Wrong Inputs")
    }
    const account = await Account.findOne({userId : userId}).session(session);

    if(!account || convertToFloat(account.balance) < amount){
        await session.abortTransaction();
        res.status(400)
        throw new Error("Insufficient balance")
    }
    const toAccount = await Account.findOne({userId : to}).session(session)
    if(!toAccount){
        await session.abortTransaction();
        res.status(400)
        throw new Error("Sender Account")
    }

    try{
        const newAmount = convertToInt(amount)
        await Account.updateOne({userId : userId}, {$inc: {balance : -newAmount}}).session(session)
        await Account.updateOne({ userId: to }, { $inc: { balance: newAmount } }).session(session);
        
        
        await session.commitTransaction()
        res.json({
            msg : "Transfer Successfull"
        })
    } catch(e){
        res.status(401)
        throw new Error(`${e.message}`)
    }


})

module.exports = { getBalance, transferFunds }