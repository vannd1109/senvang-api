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
    password: {
      required: true,
      type: String,
    },
    roles: {
      required: true,
      type: Array,
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
