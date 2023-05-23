const mongoose = require("mongoose");

const Employee = new mongoose.Schema(
  {
    fullname: {
      required: true,
      type: String,
    },
    gender: {
      require: true,
      type: String,
    },
    department: {
      require: true,
      type: String,
    },
    emplID: {
      require: true,
      type: Number,
    },
    username: {
      require: true,
      type: String,
    },
    password: {
      require: true,
      type: String,
    },
    baseSalary: {
      require: true,
      type: String,
    },
    commutingAssistance: {
      require: true,
      type: String,
    },
    housingAssistance: {
      require: true,
      type: String,
    },
    phoneFee: {
      require: true,
      type: String,
    },
    slippageSupport: {
      require: true,
      type: String,
    },
    numberDaysLeave: {
      require: true,
      type: Number,
    },
    menuBookRice: {
      require: true,
      type: Array,
    },
    manageID: {
      require: true,
      type: String,
    },
    birthday: Date,
    address: String,
    email: String,
    phone: String,
    avatar: String,
  },
  { timestamps: true }
);

Employee.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Employee", Employee);
