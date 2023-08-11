const mongoose = require("mongoose");

const Base = new mongoose.Schema(
  {
    url: {
      required: true,
      type: String,
    },
    access_token: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

Base.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Base", Base);
