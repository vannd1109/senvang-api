const mongoose = require("mongoose");

const Service = new mongoose.Schema({
  code: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  description: String,
  img: {
    required: true,
    type: String,
  },
});

Service.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Service", Service);
