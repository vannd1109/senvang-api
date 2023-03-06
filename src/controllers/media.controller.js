const db = require("../models");
const Media = db.media;

function Convert(string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

exports.add = (req, res) => {
  try {
    const body = req.body;

    const files = req.files;
    const file = req.files[0];
    const _album = [...files];

    let img = "";

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      file["path"] =
        req.protocol + "://" + req.get("host") + "\\" + file["path"];
    }

    img =
      req.protocol +
      "://" +
      req.get("host") +
      "/uploads/media/" +
      Convert(body.title).toLowerCase().replaceAll(" ","-") + "/" +
      file.filename;

    _album.shift();

    const media = new Media({
      title: body.title,
      img: img,
      album: _album,
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

exports.singleAlbum = (req, res) => {
  try {
    Media.findOne({ _id: req.params.id }, function (err, result) {
      if (err) throw err;
      return res.json(result);
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getAllMedia = (req, res) => {
  Media.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};
