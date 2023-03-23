const config = require("../config/auth.config");
const db = require("../models");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

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
  User.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};

exports.getUserById = (req, res) => {
  const _id = req.params.id;
  User.find({ _id: _id }, function (err, result) {
    if (err) throw err;
    const user = result[0];
    const _result = {
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      photo: user.photo,
      role: user.role,
    };
    return res.json(_result);
  });
};

exports.findUserByEmail = (req, res) => {
  const { email } = req.params;
  User.find({ email: email }, function (err, result) {
    if (err) throw err;

    if (result.length === 0) {
      res.send({ message: "Không có kết quả tìm kiếm" });
    } else {
      const user = result[0];
      const _result = {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
      };
      return res.json(_result);
    }
  });
};

exports.edit = async (req, res) => {
  try {
    const body = req.body;

    let img = "";

    if (body.photo) {
      img = body.photo;
    } else {
      img =
        req.protocol +
        "://" +
        req.get("host") +
        "/uploads/account/" +
        req.file.filename;
    }
    const id = body.id;

    User.findById(id, (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      user.fullname = body.fullname;
      user.email = body.email;
      user.role = body.role;
      user.photo = img;

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      user.save();

      res.status(200).send({
        message: "Cập nhật thông tin thành công!",
        id: id,
        fullname: body.fullname,
        username: body.username,
        email: body.email,
        role: body.role,
        photo: img,
        accessToken: token,
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.body.id;

    User.findByIdAndDelete(id, function (err) {
      if (err) {
        res.status(500).send({ message: err });
      }
      res.send({ message: "Xóa thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const body = req.body;
    const id = body.id;

    User.findById(id, (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      (user.password = bcrypt.hashSync(body.password, 8)), user.save();
      res.send({ message: "Cập nhật mật khẩu thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.singleUser = (req, res) => {
  try {
    User.findOne({ _id: req.params.id }, function (err, result) {
      if (err) throw err;
      return res.json(result);
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.sendEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const send_to = email;
    const sent_from = "duynguyen1109gl@gmail.com";
    const reply_to = email;
    const subject = "Thank YOU Message";
    const message = `
      <h3>Hello Duy Van</h3>
      <p>Thank for your Sen Vang</p>
      <p>Regards...</p>
    `;

    await sendEmail(subject, message, send_to, sent_from, reply_to);

    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
