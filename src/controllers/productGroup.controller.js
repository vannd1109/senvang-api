const db = require("../models");
const ProductGroup = db.productGroup;

function Convert(string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

exports.getAllProductGroup = (req, res) => {
  ProductGroup.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};

exports.singleProductGroup = (req, res) => {
  try {
    ProductGroup.findOne({ _id: req.params.id }, function (err, result) {
      if (err) throw err;
      return res.json(result);
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.add = (req, res) => {
  try {
    const body = req.body;

    const file = req.files[0];

    ProductGroup.findOne({
      code: body.code,
    }).exec((err, u) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (u) {
        res.status(400).send({
          message: "Mã nhóm sản phẩm đã tồn tại! Vui lòng kiểm tra lại.",
        });
        return;
      } else {
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
      }
    });
  } catch (error) {
    console.log(error.message);
  }
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
        "/uploads/product-group/" +
        Convert(body.name).replaceAll(" ", "-").toLowerCase() +
        "/" +
        file.filename;
    }
    const id = body.id;

    ProductGroup.findById(id, (err, productGroup) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      productGroup.code = body.code;
      productGroup.name = body.name;
      productGroup.img = img;
      productGroup.items = body.items;

      productGroup.save();
      res.send({ message: "Cập nhật thông tin thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.body.id;

    ProductGroup.findByIdAndDelete(id, function (err) {
      if (err) {
        res.status(500).send({ message: err });
      }
      res.send({ message: "Xóa thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};
