const db = require("../models");
const New = db.new;

exports.getAllNew = (req, res) => {
  New.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};
