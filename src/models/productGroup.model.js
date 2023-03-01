const mongoose = require("mongoose");

const ProductGroup = new mongoose.Schema(
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
      require: true,
      type: String,
    },
    items: {
      require: true,
      type: Array,
    },
  },
  { timestamps: true }
);

ProductGroup.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("ProductGroup", ProductGroup);
