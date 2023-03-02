const db = require("../models");
const ProductGroup = db.productGroup;

exports.add = (req, res) => {
  try {
    const body = req.body;

    const file = req.files[0];

    const productGroup = new ProductGroup({
      code: body.code,
      name: body.name,
      items: body.items,
      img: req.protocol + "://" + req.get("host") + "\\" + file["path"],
    });

    productGroup.save((err, productGroup) => {
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
