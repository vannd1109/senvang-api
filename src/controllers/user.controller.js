const config = require("../config/auth.config");
const db = require("../models");
const nodemailer = require("nodemailer");

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

      user.save();
      res.send({ message: "Cập nhật thông tin thành công!" });
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

exports.sendEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const adminEmail = "admin@gmail.com";
    const adminPassword = "123456";

    const mailHost = "smtp.gmail.com";
    const mailPort = 587;
      const transporter = nodemailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false,
        auth: {
          user: adminEmail,
          pass: adminPassword,
        },
      });

      const options = {
        from: adminEmail, // địa chỉ admin email bạn dùng để gửi
        to: email, // địa chỉ gửi đến
        subject: "Tiêu đề email", // Tiêu đề của mail
        html: "htmlContent" // Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông thường.
      }

      await transporter.sendMail(options);

      console.log("Successfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};
