const db = require("../models");
const Menu = db.menu;

exports.getAllMenu = (req, res) => {
  Menu.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};

exports.singleMenu = async (req, res) => {
  try {
    Menu.findOne({ _id: req.params.id }, function (err, result) {
      if (err) throw err;
      return res.json(result);
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.add = (req, res) => {
  const body = req.body;

  Menu.findOne({
    code: body.code,
  }).exec((err, u) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (u) {
      res.status(400).send({
        message: "Mã menu đã tồn tại! Vui lòng kiểm tra lại.",
      });
      return;
    } else {
      const menu = new Menu({
        code: body.code,
        name: body.name,
        items: body.items,
      });

      menu.save((err, product) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          res.send({ message: "Thêm thành công menu mới!" });
        }
      });
    }
  });
};

exports.edit = async (req, res) => {
  try {
    const body = req.body;
    const id = body.id;
    Menu.findById(id, (err, menu) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      menu.code = body.code;
      menu.name = body.name;
      menu.items = body.items;
      menu.save();
      res.send({ message: "Cập nhật dữ liệu thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.body.id;

    Menu.findByIdAndDelete(id, function (err) {
      if (err) {
        res.status(500).send({ message: err });
      }
      res.send({ message: "Xóa thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};
