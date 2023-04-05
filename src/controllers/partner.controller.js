const fs = require("fs");
const process = require("process");
const db = require("../models");
const Partner = db.partner;

function Convert(string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

exports.getAllPartner = (req, res) => {
  Partner.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};

exports.singlePartner = (req, res) => {
  try {
    Partner.findOne({ _id: req.params.id }, function (err, result) {
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

  Partner.findOne({
    code: body.code,
  }).exec((err, u) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (u) {
      res.status(400).send({
        message: "Mã đối tác đã tồn tại! Vui lòng kiểm tra lại.",
      });
      return;
    } else {
      const partnerItem = new Partner({
        code: body.code,
        company: body.company,
        email: body.email,
        phone: body.phone,
        description: body.description,
        content: body.content,
        img: req.protocol + "://" + req.get("host") + "\\" + file["path"],
      });

      partnerItem.save((err, partnerItem) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          res.send({ message: "Thêm thành công đối tác mới!" });
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
        "/uploads/partner/" + Convert(body.code).toLowerCase().replaceAll(" ","-") + "/" +
        file.filename;
    }
    const id = body.id;

    Partner.findById(id, (err, partner) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      partner.code = body.code;
      partner.company = body.company;
      partner.email = body.email;
      partner.phone = body.phone;
      partner.description = body.description;
      (partner.content = body.content), (partner.sort_desc = body.sort_desc);
      partner.img = img;

      partner.save();
      res.send({ message: "Cập nhật dữ liệu thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.body.id;

    Partner.findOne({ _id: id }, function async(err, res) {
      if (err) throw err;
      process.chdir("uploads");
      process.chdir("partner");
      const length = res.img.split("\\").length;
      const item = res.img.split("\\")[length - 1];

      console.log(id);

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

    Partner.findByIdAndDelete(id, function (err) {
      if (err) {
        res.status(500).send({ message: err });
      }
      res.send({ message: "Xóa thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};
