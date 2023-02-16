const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    img: {
        required: true,
        type: String
    },
    url: {
        required: true,
        type: String
    },
}, {timestamps: true})

module.exports = mongoose.model('Slider', sliderSchema)