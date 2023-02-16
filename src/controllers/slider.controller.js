const db = require("../models");
const Slider = db.slider;
const path = require("path");
const fs = require('fs');
const { log } = require("console");

function Convert(string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

exports.add = async (req, res) => {
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
        res.send({ message: "Thêm thành công bộ slider mới!" });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

// exports.singleAlbum = (req, res) => {
//   try {
//     Media.findOne({_id: req.params.id}, function(err, result) {
//       if (err) throw err;
//       return res.json(result);
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

exports.getAllSlider = (req, res) => {
  Slider.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};