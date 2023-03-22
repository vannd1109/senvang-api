const fs = require("fs");
const process = require("process");
const db = require("../models");
const Banner = db.banner;

function Convert(string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

exports.getAllBanner = (req, res) => {
  Banner.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};

exports.singleBanner = (req, res) => {
  try {
    Banner.findOne({ _id: req.params.id }, function (err, result) {
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

    Banner.findOne({
      code: body.code,
    }).exec((err, u) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (u) {
        res.status(400).send({ message: "Mã banner đã tồn tại! Vui lòng kiểm tra lại." });
        return;
      } else {
        const banner = new Banner({
          code: body.code,
          items: body.items,
          img: req.protocol + "://" + req.get("host") + "\\" + file["path"],
        });
  
        banner.save((err, banner) => {
          if (err) {
            res.status(500).send({ message: err });
          } else {
            res.send({ message: "Thêm thành công banner mới!" });
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
    const id = body.id;

    let img = "";

    if (body.img) {
      img = body.img;
    } else {
      img =
        req.protocol +
        "://" +
        req.get("host") +
        "/uploads/banner/" +
        Convert(body.code).replaceAll(" ", "-").toLowerCase() +
        "/" +
        file.filename;
    }

    Banner.findById(id, (err, banner) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      banner.code = body.code;
      banner.img = img;
      banner.items = body.items;

      banner.save();
      res.send({ message: "Cập nhật thông tin thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.body.id;

    Banner.findOne({ _id: id }, function async(err, res) {
      if (err) throw err;
      process.chdir("uploads");
      process.chdir("banner");

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

    Banner.findByIdAndDelete(id, function (err) {
      if (err) {
        res.status(500).send({ message: err });
      }
      res.send({ message: "Xóa thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};
