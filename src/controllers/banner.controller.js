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

    const banner = new Banner({
      code: body.code,
      items: body.items,
      img: req.protocol + "://" + req.get("host") + "\\" + file["path"],
      url: body.url,
    });

    banner.save((err, banner) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        res.send({ message: "Thêm thành công banner mới!" });
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
        "/uploads/banner/" +
        Convert(body.name).replaceAll(" ", "-").toLowerCase() +
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
      banner.url = body.url;

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


