const db = require("../models");
const Slider = db.slider;

exports.add = (req, res) => {
  try {
    const body = req.body;
    const file = req.files[0];

    const slider = new Slider({
      title: body.title,
      url: body.url,
      img: req.protocol + "://" + req.get("host") + "\\" + file["path"],
    });

    slider.save((err, slider) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        res.send({ message: "Thêm thành công slider mới!" });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getAllSlider = (req, res) => {
  Slider.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};

exports.singleSlider = (req, res) => {
  try {
    Slider.findOne({ _id: req.params.id }, function (err, result) {
      if (err) throw err;
      return res.json(result);
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
        "/uploads/slider/" +
        file.filename;
    }
    const id = body.id;

    Slider.findById(id, (err, slider) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      slider.title = body.title;
      slider.img = img;
      slider.url = body.url;

      slider.save();
      res.send({ message: "Cập nhật dữ liệu thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.body.id;

    Slider.findByIdAndDelete(id, function (err) {
      if (err) {
        res.status(500).send({ message: err });
      }
      res.send({ message: "Xóa thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};
