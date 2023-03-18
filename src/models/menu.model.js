const mongoose = require("mongoose");

const Menu = new mongoose.Schema(
  {
    code: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    items: {
      require: true,
      type: Array,
    },
  },
  { timestamps: true }
);

Menu.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Menu", Menu);
