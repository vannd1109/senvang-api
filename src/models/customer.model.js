const mongoose = require("mongoose");

const Customer = new mongoose.Schema({
  code: {
    require: true,
    type: String,
  },
  fullname: {
    require: true,
    type: String,
  },
  company: {
    require: true,
    type: String,
  },
  phone: {
    require: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
  },
  img: {
    required: true,
    type: String,
  },
});

Customer.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Customer", Customer);
