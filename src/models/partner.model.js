const mongoose = require("mongoose");

const Partner = new mongoose.Schema(
  {
    code: {
      require: true,
      type: String,
    },
    company: {
      require: true,
      type: String,
    },
    phone: {
      require: true,
      type: String,
    },
    email: {
      require: true,
      type: String,
    },
    img: {
      required: true,
      type: String,
    },
    description: String,
    content: String,
  },
  { timestamps: true }
);

Partner.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Partner", Partner);
