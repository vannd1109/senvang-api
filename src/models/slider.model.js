const mongoose = require("mongoose");

const Slider = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    img: {
      required: true,
      type: String,
    },
    url: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

Slider.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Slider", Slider);
