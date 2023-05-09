const mongoose = require("mongoose");

const BookRice = new mongoose.Schema(
  {
    startDate: {
      required: true,
      type: Date,
    },
    endDate: {
      required: true,
      type: Date,
    },
    closeDate: {
      required: true,
      type: Date,
    },
    menu: {
      required: true,
      type: Array,
    },
  },
  { timestamps: true }
);

BookRice.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("BookRice", BookRice);
