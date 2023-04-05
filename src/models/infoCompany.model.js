const mongoose = require("mongoose");

const InfoCompany = new mongoose.Schema(
  {
    code: {
      required: true,
      type: String,
    },
    tradingName: {
      required: true,
      type: String,
    },
    companyName: {
      required: true,
      type: String,
    },
    taxCode: {
      required: true,
      type: String,
    },
    registerPlace: {
      required: true,
      type: String,
    },
    address: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    phone: {
      required: true,
      type: String,
    },
    legalRepresentative: {
      required: true,
      type: String,
    },
    dateRange: {
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

InfoCompany.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("InfoCompany", InfoCompany);
