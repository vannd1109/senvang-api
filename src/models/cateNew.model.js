const mongoose = require("mongoose");

const CateNew = new mongoose.Schema(
  {
    code: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    img: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

CateNew.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("CateNew", CateNew);
