const db = require("../models");
const Product = db.product;

exports.getAllProduct = (req, res) => {
  Product.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};
