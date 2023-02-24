const db = require("../models");
const CateProduct = db.cateProduct;

exports.getAllCateProduct = (req, res) => {
  CateProduct.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};

exports.add = async (req, res) => {
  try {
    const body = req.body;
    const file = req.files[0];
    let img = "";

    if (file) {
      img = req.protocol + "://" + req.get("host") + "\\" + file["path"];
    } else {
      img = req.protocol + "://" + req.get("host") + "/uploads/cate-product/default.jpg";
    }
    

    const cateProduct = new CateProduct({
      code: body.code,
      name: body.name,
      description: body.description,
      // img: req.protocol + "://" + req.get("host") + "\\" + file["path"],
      img: img
    });

    cateProduct.save((err, cateProduct) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        res.send({ message: "Thêm thành công danh mục sản phẩm mới!" });
      }
    });


  } catch (error) {
    
  }
  // CateProduct.find({}, function (err, result) {
  //   if (err) throw err;
  //   return res.json(result);
  // });
};

exports.singleProduct = async (req, res) => {
  try {
    CateProduct.findOne({_id: req.params.id}, function(err, result) {
      if (err) throw err;
      return res.json(result);
    });
  } catch (error) {
    console.log(error.message);
  }
};
