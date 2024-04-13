const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    username: { type: "String", unique: true, required: true, lowercase: true, minLength: 3 },
    firstName: { type: "String", required: true, maxLength: 20 },
    lastName: { type: "String", maxLength: 20 },
    email: { type: "String", unique: true, required: true },
    profilePic: {
        type: "String",
        required: true,
        default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        password: { type: "String", required: true, minLength: 6 },
    })

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema);

module.exports = User;