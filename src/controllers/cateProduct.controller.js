const db = require("../models");
const CateProduct = db.cateProduct;
const Product = db.product;

exports.getAllCateProduct = (req, res) => {
  CateProduct.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};

exports.singleCateProduct = async (req, res) => {
  try {
    CateProduct.findOne({ _id: req.params.id }, function (err, result) {
      if (err) throw err;
      return res.json(result);
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.add = async (req, res) => {
  try {
    const body = req.body;
    const file = req.files[0];
    let img = "";

    if (file) {
      img = req.protocol + "://" + req.get("host") + "\\" + file["path"];
    } else {
      img =
        req.protocol +
        "://" +
        req.get("host") +
        "/uploads/cate-product/default.jpg";
    }

    const cateProduct = new CateProduct({
      code: body.code,
      name: body.name,
      description: body.description,
      // img: req.protocol + "://" + req.get("host") + "\\" + file["path"],
      img: img,
    });

    cateProduct.save((err, cateProduct) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        res.send({ message: "Thêm thành công danh mục sản phẩm mới!" });
      }
    });
  } catch (error) {}
};

exports.getAllProductByCateId = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.aggregate([
      {
        $lookup: {
          from: "cateproducts",
          localField: "_id",
          foreignField: "cateId",
          as: "productList",
        },
      },
      { $match: { cateId: id } },
      {
        $project: {
          code: 1,
          name: 1,
          img: 1,
        },
      },
    ]);

    return res.json(result);
  } catch (error) {
    console.log(error.message);
  }
};

// exports.getCateProductById = (req, res) => {
//   const _id = req.params.id;
//   CateProduct.find({ _id: _id }, function (err, result) {
//     if (err) throw err;
//     const cateProduct = result[0];
//     const _result = {
//       code: cateProduct.code,
//       name: cateProduct.name,
//       img: cateProduct.img,
//     };
//     return res.json(_result);
//   });
// };

exports.edit = async (req, res) => {
  try {
    const body = req.body;
    const file = req.files[0];

    let img = "";

    if(body.img) {
      img = body.img
    }else {
      img =
        req.protocol +
        "://" +
        req.get("host") +
        "/uploads/cate-product/" +
        file.filename;
    }
    const id = body.id;

    CateProduct.findById(id, (err, cate) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      cate.code = body.code;
      cate.name = body.name;
      cate.img = img;

      cate.save();
      res.send({ message: "Cập nhật thông tin thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.body.id;

    CateProduct.findByIdAndDelete(id, function (err) {
      if (err) {
        res.status(500).send({ message: err });
      }
      res.send({ message: "Xóa thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};
