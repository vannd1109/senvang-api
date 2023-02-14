const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    img: {
        required: true,
        type: String
    },
    url: {
        required: true,
        type: String
    },
    link: String,
    title: {
        required: true,
        type: String
    },
}, {timestamps: true})

module.exports = mongoose.model('Slider', sliderSchema)