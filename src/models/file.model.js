const mongoose = require("mongoose");

const File = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", File);
