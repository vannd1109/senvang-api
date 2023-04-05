const fs = require("fs");
const process = require("process");
const db = require("../models");
const moment = require("moment/moment");
const InfoCompany = db.infoCompany;

exports.getInfoCompany = (req, res) => {
  InfoCompany.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
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
        "/uploads/info-company/" +
        file.filename;
    }
    const id = body.id;

    // InfoCompany.findOne({ _id: id }, function async(err, res) {
    //   if (err) throw err;
    //   process.chdir("uploads");
    //   process.chdir("info-company");
    //   const length = res.img.split("/").length;
    //   const item = res.img.split("/")[length - 1];

    //   fs.rmSync(
    //     process.cwd() + "\\" + item,
    //     { recursive: true, force: true },
    //     (err) => {
    //       if (err) {
    //         return console.log("error occurred in deleting file", err);
    //       }
    //       console.log("File deleted successfully");
    //       process.chdir("../");
    //       process.chdir("../");
    //     }
    //   );

    //   return true;
    // });

    InfoCompany.findById(id, (err, infoCompany) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      infoCompany.tradingName = body.tradingName;
      infoCompany.companyName = body.companyName;
      infoCompany.taxCode = body.taxCode;
      infoCompany.registerPlace = body.registerPlace;
      infoCompany.address = body.address;
      infoCompany.email = body.email;
      infoCompany.phone = body.phone;
      infoCompany.legalRepresentative = body.legalRepresentative;
      infoCompany.dateRange = new Date(moment(body.dateRange, "DD/MM/YYYY"));
      infoCompany.img = img;

      infoCompany.save();
    //   process.chdir("../");
    //   process.chdir("../");
      res.send({ message: "Cập nhật dữ liệu thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};
