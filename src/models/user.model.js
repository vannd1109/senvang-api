const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    fullname: String,
    username: String,
    email: String,
    role: String,
    photo: String,
    password: String,
  },
  { timestamps: true }
);

User.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("User", User);
