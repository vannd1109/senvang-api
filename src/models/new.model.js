const mongoose = require("mongoose");

const New = new mongoose.Schema({
  code: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  img: {
    required: true,
    type: String,
  },
  cateId: {
    require: true,
    type: String,
  },
});

New.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("New", New);
