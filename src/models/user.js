const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        required: true,
        type: Number
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    firstname: {
        required: true,
        type: String
    },
    lastname: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    birthday: {
        required: true,
        type: Date
    },
    avatar: {
        required: true,
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)