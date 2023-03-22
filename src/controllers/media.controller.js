const fs = require("fs");
const process = require("process");
const db = require("../models");
const Media = db.media;

function Convert(string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

exports.getAllMedia = (req, res) => {
  Media.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
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
      Convert(body.code).toLowerCase().replaceAll(" ", "-") +
      "/" +
      file.filename;

    _album.shift();

    Media.findOne({
      code: body.code,
    }).exec((err, u) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (u) {
        res.status(400).send({
          message: "Mã bộ sưu tập đã tồn tại! Vui lòng kiểm tra lại.",
        });
        return;
      } else {
        const media = new Media({
          code: body.code,
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
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.edit = async (req, res) => {
  try {
    const files = req.files;
    const file = req.files[0];
    const body = req.body;

    console.log(process.cwd());

    let album = [];
    let img = "";

    if (files.length > 0) {
      album = [...files];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        file["path"] =
          req.protocol + "://" + req.get("host") + "\\" + file["path"];
      }
      album.unshift();
    } else {
      album = [...body.album];
    }

    if (body.img) {
      img = body.img;
    } else {
      img =
        req.protocol +
        "://" +
        req.get("host") +
        "/uploads/media/" +
        Convert(body.code).toLowerCase().replaceAll(" ", "-") +
        "/" +
        file.filename;
    }

    const id = body.id;

    Media.findById(id, (err, media) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      media.code = body.code;
      media.title = body.title;
      media.img = img;
      media.album = album;

      media.save();
      res.send({ message: "Cập nhật thông tin thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.body.id;

    Media.findOne({ _id: id }, function async(err, res) {
      if (err) throw err;
      process.chdir("uploads");
      process.chdir("media");

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

    Media.findByIdAndDelete(id, function (err) {
      if (err) {
        res.status(500).send({ message: err });
      }

      res.send({ message: "Xóa thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};
