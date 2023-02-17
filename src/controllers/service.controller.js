const db = require("../models");
const Service = db.service;

exports.getAllService = (req, res) => {
  Service.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};
