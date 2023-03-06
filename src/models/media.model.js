const mongoose = require("mongoose");

const Media = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    img: {
      required: true,
      type: String,
    },
    album: Array,
  },
  { timestamps: true }
);

Media.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Media", Media);
