const db = require("../models");
const Page = db.page;

exports.getAllPage = (req, res) => {
  Page.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};