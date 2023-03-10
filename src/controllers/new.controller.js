const db = require("../models");
const News = db.new;

exports.getAllNew = (req, res) => {
  News.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};

exports.singleNew = (req, res) => {
  try {
    News.findOne({ _id: req.params.id }, function (err, result) {
      if (err) throw err;
      return res.json(result);
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.add = (req, res) => {
  const body = req.body;
  const file = req.files[0];

  const newItem = new News({
    code: body.code,
    name: body.name,
    cateId: body.cateId,
    description: body.description,
    img: req.protocol + "://" + req.get("host") + "\\" + file["path"],
  });

  newItem.save((err, newItem) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      res.send({ message: "Thêm thành công tin tức mới!" });
    }
  });
};

exports.edit = async (req, res) => {
  try {
    const body = req.body;
    const file = req.files[0];

    let img = "";

    if (body.img) {
      img = body.img;
    } else {
      img =
        req.protocol +
        "://" +
        req.get("host") +
        "/uploads/news/" +
        file.filename;
    }
    const id = body.id;

    News.findById(id, (err, news) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      news.code = body.code;
      news.name = body.name;
      news.description = body.description;
      news.img = img;
      news.cateId = body.cateId;

      news.save();
      res.send({ message: "Cập nhật thông tin thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.body.id;

    News.findByIdAndDelete(id, function (err) {
      if (err) {
        res.status(500).send({ message: err });
      }
      res.send({ message: "Xóa thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};
