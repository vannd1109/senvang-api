const db = require("../models");
const Customer = db.customer;

exports.getAllCustomer = (req, res) => {
  Customer.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};
