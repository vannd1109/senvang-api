const multiparty = require("multiparty");
const db = require("../models");
const Media = db.media;

exports.add = (req, res) => {
  try {
    const body = req.body;

    const media = new Media({
      title: body.title,
      album: body.album,
    });

    media.save((err, media) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        res.send({ message: "Thêm thành công bộ sưu tập mới!" });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};


exports.getAllMedia = (req, res) => {
    Media.find({}, function(err, result) {
    if (err) throw err;
    return res.json(result);
  });
};