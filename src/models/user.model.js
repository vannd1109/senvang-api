const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    fullname: {
      required: true,
      type: String,
    },
    username: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    role: {
      required: true,
      type: String,
    },
    photo: String,
    password: {
      required: true,
      type: String,
    },
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
