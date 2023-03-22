const fs = require("fs");
const process = require("process");
const db = require("../models");
const CateNew = db.cateNew;
const News = db.new;

function Convert(string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

exports.getAllCateNew = (req, res) => {
  CateNew.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};

exports.getAllNewByCateId = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await News.aggregate([
      {
        $lookup: {
          from: "catenews",
          localField: "_id",
          foreignField: "cateId",
          as: "newList",
        },
      },
      { $match: { cateId: id } },
    ]);
    return res.json(result);
  } catch (error) {
    console.log(error.message);
  }
};

exports.singleCateNew = (req, res) => {
  try {
    CateNew.findOne({ _id: req.params.id }, function (err, result) {
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

    CateNew.findOne({
      code: body.code,
    }).exec((err, u) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (u) {
        res
          .status(400)
          .send({
            message: "Mã danh mục tin tức đã tồn tại! Vui lòng kiểm tra lại.",
          });
        return;
      } else {
        const cateNew = new CateNew({
          code: body.code,
          name: body.name,
          img: img,
        });

        cateNew.save((err, cateNew) => {
          if (err) {
            res.status(500).send({ message: err });
          } else {
            res.send({ message: "Thêm thành công danh mục tin tức mới!" });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
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
        "/uploads/cate-new/" +
        Convert(body.code).toLowerCase().replaceAll(" ", "-") +
        "/" +
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

exports.delete = async (req, res) => {
  try {
    const id = req.body.id;

    CateNew.findOne({ _id: id }, function async(err, res) {
      if (err) throw err;
      process.chdir("uploads");
      process.chdir("cate-new");

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

    CateNew.findByIdAndDelete(id, function (err) {
      if (err) {
        res.status(500).send({ message: err });
      }

      res.send({ message: "Xóa thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};
