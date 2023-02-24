const db = require("../models");
const Product = db.product;

exports.getAllProduct = (req, res) => {
  Product.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};

exports.add = (req, res) => {
  const body = req.body;
  const file = req.files[0];

  const product = new Product({
    code: body.code,
    name: body.name,
    cateId: body.cateId,
    description: body.description,
    img: req.protocol + "://" + req.get("host") + "\\" + file["path"],
  });

  product.save((err, product) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      res.send({ message: "Thêm thành công sản phẩm mới!" });
    }
  });
};
