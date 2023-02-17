const db = require("../models");
const CateNew = db.cateNew;

exports.getAllCateNew = (req, res) => {
  CateNew.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};
