const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { upload } = require("./file.controller");

exports.signup = async (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  console.log(req);
  // const user = new User({
  //   fullname: req.body.fullname,
  //   username: req.body.username,
  //   email: req.body.email,
  //   roles: req.body.roles,
  //   avatar: url + '/public/' + req.body.avatar,
  //   password: bcrypt.hashSync(req.body.password, 8),
  // });

  // await upload(user, res);


  // console.log(user);

  // user.save((err, user) => {
  //   if (err) {
  //     res.status(500).send({ message: err });
  //     return;
  //   } else {
  //     res.send({ message: "Tạo thành công tài khoản mới!" });
  //     return;
  //   }
  // });
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
          message: "Invalid Password!",
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
