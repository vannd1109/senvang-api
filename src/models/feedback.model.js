const mongoose = require("mongoose");

const Feedback = new mongoose.Schema(
  {
    fullname: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    notes: {
      required: true,
      type: Array,
    },
  },
  { timestamps: true }
);

Feedback.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Feedback", Feedback);
