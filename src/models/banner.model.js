const mongoose = require("mongoose");

const Banner = new mongoose.Schema({
  code: {
    require: true,
    type: String,
  },
  description: {
    require: true,
    type: String,
  },
  img: {
    required: true,
    type: String,
  },
  page: {
    required: true,
    type: String,
  },
});

Banner.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Banner", Banner);
