const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const body = req.body;

    let img = "";

    if (req.file) {
      img =
        req.protocol +
        "://" +
        req.get("host") +
        "/uploads/" +
        req.file.filename;
    } else {
      img = req.protocol + "://" + req.get("host") + "/uploads/default.png";
    }

    User.findOne({
      username: body.username,
    }).exec((err, u) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (u) {
        res.status(400).send({ message: "Tên đăng nhập đã tồn tại!!" });
        return;
      }

      // Email
      User.findOne({
        email: body.email,
      }).exec((err, u) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (u) {
          res.status(400).send({ message: "Email đã được sử dụng!" });
          return;
        } else {
          const user = new User({
            fullname: body.fullname,
            username: body.username,
            email: body.email,
            roles: body.roles || ["User"],
            password: bcrypt.hashSync(body.password, 8),
            photo: img,
          });
          user.save( (err, user) => {
            if (err) {
               res.status(500).send({ message: err });
            } else {
               res.send({ message: "Tạo thành công tài khoản mới!" });
            }
          });
        }
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "Người dùng không tồn tại." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mật khẩu không đúng!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      const authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].toUpperCase());
      }

      res.status(200).send({
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        roles: authorities,
        photo: user.photo,
        accessToken: token,
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "Bạn đã đăng xuất khỏi hệ thống!" });
  } catch (err) {
    this.next(err);
  }
};
