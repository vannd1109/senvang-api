const mongoose = require("mongoose");

const News = new mongoose.Schema(
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
    img: {
      required: true,
      type: String,
    },
    sort_desc: {
      require: true,
      type: String,
    },
    cateId: {
      require: true,
      type: String,
    },
  },
  { timestamps: true }
);

News.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("News", News);
