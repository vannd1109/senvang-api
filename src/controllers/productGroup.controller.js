const db = require("../models");
const ProductGroup = db.productGroup;

exports.add = (req, res) => {
  try {
    const body = req.body;

    const files = req.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      file["path"] =
        req.protocol + "://" + req.get("host") + "\\" + file["path"];
    }

    const media = new Media({
      title: body.title,
      album: files,
    });

    media.save((err, media) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        res.send({ message: "Thêm thành công nhóm sản phẩm mới!" });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.singleProductGroup = (req, res) => {
  try {
    ProductGroup.findOne({_id: req.params.id}, function(err, result) {
      if (err) throw err;
      return res.json(result);
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getAllProductGroup = (req, res) => {
    ProductGroup.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};
