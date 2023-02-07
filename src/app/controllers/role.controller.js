const db = require("../models");

const Role = db.role;

exports.getAllRoles = (req, res) => {
    Role.find({}, function(err, result) {
    if (err) throw err;
    return res.json(result);
  });
};
