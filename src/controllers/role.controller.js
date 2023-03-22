const db = require("../models");

const Role = db.role;

exports.getAllRoles = (req, res) => {
    Role.find({}, function(err, result) {
    if (err) throw err;
    return res.json(result);
  });
};

exports.singleRole = async (req, res) => {
  try {
    Role.findOne({ value: req.params.value }, function (err, result) {
      if (err) throw err;
      return res.json(result);
    });
  } catch (error) {
    console.log(error.message);
  }
};
