const db = require("../models");
const News = db.new;

exports.getAllNew = (req, res) => {
  News.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
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

exports.getNewById = (req, res) => {
  const _id = req.params.id;
  News.find({ _id: _id }, function (err, result) {
    if (err) throw err;
    const newItem = result[0];
    const _result = {
      code: newItem.code,
      name: newItem.name,
      description: newItem.description,
      img: newItem.img,
      cateId: newItem.cateId,
    };
    return res.json(_result);
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