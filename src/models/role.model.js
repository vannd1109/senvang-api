const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    value: String,
    label: String
  })
);

module.exports = Role;