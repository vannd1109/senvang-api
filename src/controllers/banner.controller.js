const db = require("../models");
const Banner = db.banner;

exports.getAllBanner = (req, res) => {
  Banner.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};
