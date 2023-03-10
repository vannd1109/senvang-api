const db = require("../models");
const Product = db.product;

exports.getAllProduct = (req, res) => {
  Product.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};

exports.singleProduct = async (req, res) => {
  try {
    Product.findOne({ _id: req.params.id }, function (err, result) {
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
        "/uploads/product/" +
        file.filename;
    }
    const id = body.id;

    Product.findById(id, (err, product) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      product.code = body.code;
      product.name = body.name;
      product.description = body.description;
      product.img = img;
      product.cateId = body.cateId;

      product.save();
      res.send({ message: "Cập nhật thông tin thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.body.id;

    Product.findByIdAndDelete(id, function (err) {
      if (err) {
        res.status(500).send({ message: err });
      }
      res.send({ message: "Xóa thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};
