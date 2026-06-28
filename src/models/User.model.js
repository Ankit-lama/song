const mongoose = require('mongoose');

const createUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {type: String, enum: ['user', 'artist'], default: 'user'},
})

const User = mongoose.model('User', createUserSchema);

module.exports = User;