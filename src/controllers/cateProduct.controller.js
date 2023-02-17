const db = require("../models");
const CateProduct = db.cateProduct;

exports.getAllCateProduct = (req, res) => {
  CateProduct.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};
