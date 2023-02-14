const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    img: {
        required: true,
        type: String
    },
    url: {
        required: true,
        type: String
    },
})

module.exports = mongoose.model('Banner', bannerSchema)