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