const mongoose = require("mongoose");

const Page = new mongoose.Schema(
  {
    title: {
      require: true,
      type: String,
    },
    catePage: String,
    description: String,
    content: String,
    img: {
      required: true,
      type: String,
    },
    slug: String,
  },
  { timestamps: true }
);

Page.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Page", Page);
