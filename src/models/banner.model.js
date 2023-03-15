const mongoose = require("mongoose");

const Banner = new mongoose.Schema(
  {
    code: {
      required: true,
      type: String,
    },
    img: {
      require: true,
      type: String,
    },
    items: {
      require: true,
      type: Array,
    },
    url: {
      require: true,
      type: String,
    },
  },
  { timestamps: true }
);

Banner.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Banner", Banner);
