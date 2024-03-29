const mongoose = require("mongoose");

const Product = new mongoose.Schema(
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
      require: true,
      type: String,
    },
    cateId: {
      require: true,
      type: String,
      ref:"cateproduct"
    },
  },
  { timestamps: true }
);

Product.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Product", Product);
