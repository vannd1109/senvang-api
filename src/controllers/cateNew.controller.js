const db = require("../models");
const CateNew = db.cateNew;

exports.getAllCateNew = (req, res) => {
  CateNew.find({}, function (err, result) {
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

exports.getCateNewById = (req, res) => {
  const _id = req.params.id;
  CateNew.find({ _id: _id }, function (err, result) {
    if (err) throw err;
    const cateNew = result[0];
    const _result = {
      code: cateNew.code,
      name: cateNew.name,
      img: cateNew.img,
    };
    return res.json(_result);
  });
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
