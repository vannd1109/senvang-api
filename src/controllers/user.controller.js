const config = require("../config/auth.config");
const db = require("../models");

const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.guestBoard = (req, res) => {
  res.status(200).send("Guest Content.");
};

exports.getAllUser = (req, res) => {
  User.find({}, function(err, result) {
    if (err) throw err;
    return res.json(result);
  });
};
