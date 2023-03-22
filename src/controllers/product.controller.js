const fs = require("fs");
const process = require("process");
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

  Product.findOne({
    code: body.code,
  }).exec((err, u) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (u) {
      res.status(400).send({ message: "Mã sản phẩm đã tồn tại! Vui lòng kiểm tra lại." });
      return;
    } else {
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

    // Product.findOne({ _id: id }, function async(err, res) {
    //   if (err) throw err;
    //   process.chdir("uploads");
    //   process.chdir("product");
    //   const length = res.img.split("/").length;
    //   const item = res.img.split("/")[length - 1];

    //   // fs.rmSync(
    //   //   process.cwd() + "\\" + item,
    //   //   { recursive: true, force: true },
    //   //   (err) => {
    //   //     if (err) {
    //   //       return console.log("error occurred in deleting file", err);
    //   //     }
    //   //     console.log("File deleted successfully");
    //   //     process.chdir("../");
    //   //     process.chdir("../");
    //   //   }
    //   // );

    //   return true;
    // });

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
      // process.chdir("../");
      // process.chdir("../");
      res.send({ message: "Cập nhật thông tin thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.body.id;

    Product.findOne({ _id: id }, function async(err, res) {
      if (err) throw err;
      process.chdir("uploads");
      process.chdir("product");
      const length = res.img.split("\\").length;
      const item = res.img.split("\\")[length - 1];

      fs.rmSync(
        process.cwd() + "\\" + item,
        { recursive: true, force: true },
        (err) => {
          if (err) {
            return console.log("error occurred in deleting file", err);
          }
          console.log("File deleted successfully");
          process.chdir("../");
          process.chdir("../");
        }
      );
      return true;
    });

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
