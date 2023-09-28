const mongoose = require("mongoose");

const Recruitment = new mongoose.Schema(
  {
    code: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    description: String,
    content: String,
    img: {
      required: true,
      type: String,
    },
    career: {
      require: true,
      type: String,
    },
    workingForm: {
      require: true,
      type: String,
    },
    wage: {
      require: true,
      type: String,
    },
    experience: {
      require: true,
      type: Number,
    },
    level: {
      require: true,
      type: String,
    },
    deadline: {
      require: true,
      type: Date,
    },
  },
  { timestamps: true }
);

Recruitment.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Recruitment", Recruitment);
