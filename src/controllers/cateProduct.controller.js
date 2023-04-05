const fs = require("fs");
const process = require("process");
const db = require("../models");
const CateProduct = db.cateProduct;
const Product = db.product;

function Convert(string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

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
    }

    CateProduct.findOne({
      code: body.code,
    }).exec((err, u) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (u) {
        res.status(400).send({ message: "Mã danh mục đã tồn tại! Vui lòng kiểm tra lại." });
        return;
      } else {
        const cateProduct = new CateProduct({
          code: body.code,
          name: body.name,
          img: img,
        });

        cateProduct.save((err, cateNew) => {
          if (err) {
            res.status(500).send({ message: err });
          } else {
            res.send({ message: "Thêm thành công danh mục sản phẩm mới!" });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
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

exports.getAllProductPaginationSortFilterByCateId = async (req, res) => {
  try {
    const id = req.params.id;
    const page = req.params.page;

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
      { $limit: 10 * page },
      { $skip: 10 * (page - 1) },
    ]);
    return res.json(result);
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
        "/uploads/cate-product/" +
        Convert(body.name).toLowerCase().replaceAll(" ", "-") +
        "/" +
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
      res.send({ message: "Cập nhật dữ liệu thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.body.id;

    CateProduct.findOne({ _id: id }, function async(err, res) {
      if (err) throw err;
      process.chdir("uploads");
      process.chdir("cate-product");

      fs.rmdir(
        process.cwd() + "\\" + res.code.toLowerCase(),
        { recursive: true, force: true },
        (err) => {
          if (err) {
            return console.log("error occurred in deleting directory", err);
          }
          console.log("Directory deleted successfully");
          process.chdir("../");
          process.chdir("../");
        }
      );
      return true;
    });

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
