const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    uri: {
        type: String,
        required: true,
    },
    title: {
        type: String,   
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',    
        required: true
    }
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;