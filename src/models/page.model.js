const mongoose = require("mongoose");

const Page = new mongoose.Schema({
  code: {
    require: true,
    type: String,
  },
  name: {
    require: true,
    type: String,
  },
  description: String,
  img: {
    required: true,
    type: String,
  },
});

Page.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Page", Page);
