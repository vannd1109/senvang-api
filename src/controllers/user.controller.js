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

exports.getUserById = (req, res) => {
  const _id = req.params.id;
  User.find({_id: _id}, function(err, result) {
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


exports.edit = async (req, res) => {
  try {
    const body = req.body;
    const file = req.files;

    let img = "";

    console.log(body);

    if (req.file) {
      img =
        req.protocol +
        "://" +
        req.get("host") +
        "/uploads/account/" +
        req.file.filename;
    } else {
      img = req.protocol + "://" + req.get("host") + "/uploads/account/default.png";
    }

    // User.findOne({
    //   username: body.username,
    // }).exec((err, u) => {
    //   if (err) {
    //     res.status(500).send({ message: err });
    //     return;
    //   }

    //   if (u) {
    //     res.status(400).send({ message: "Tên đăng nhập đã tồn tại!!" });
    //     return;
    //   }

    //   // Email
    //   User.findOne({
    //     email: body.email,
    //   }).exec((err, u) => {
    //     if (err) {
    //       res.status(500).send({ message: err });
    //       return;
    //     }

    //     if (u) {
    //       res.status(400).send({ message: "Email đã được sử dụng!" });
    //       return;
    //     } else {
    //       const user = new User({
    //         fullname: body.fullname,
    //         username: body.username,
    //         email: body.email,
    //         role: body.role,
    //         password: bcrypt.hashSync(body.password, 8),
    //         photo: img,
    //       });

    //       user.save( (err, user) => {
    //         if (err) {
    //            res.status(500).send({ message: err });
    //         } else {
    //            res.send({ message: "Tạo thành công tài khoản mới!" });
    //         }
    //       });
    //     }
    //   });
    // });
  } catch (error) {
    console.log(error.message);
  }
};
