const db = require("../models");
const CateNew = db.cateNew;

exports.getAllCateNew = (req, res) => {
  CateNew.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};

exports.singleCateNew= (req, res) => {
  try {
    CateNew.findOne({ _id: req.params.id }, function (err, result) {
      if (err) throw err;
      console.log(result);
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
      img = req.protocol + "://" + req.get("host") + "/uploads/cate-new/default.jpg";
    }
    

    const cateNew = new CateNew({
      code: body.code,
      name: body.name,
      img: img
    });

    cateNew.save((err, cateNew) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        res.send({ message: "Thêm thành công danh mục tin tức mới!" });
      }
    });


  } catch (error) {
    
  }
  // CateProduct.find({}, function (err, result) {
  //   if (err) throw err;
  //   return res.json(result);
  // });
};

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
        "/uploads/cate-new/" +
        file.filename;
    }
    const id = body.id;

    CateNew.findById(id, (err, cate) => {
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
