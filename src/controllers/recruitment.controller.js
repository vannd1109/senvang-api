const fs = require("fs");
const process = require("process");
const db = require("../models");
const Recruitment = db.recruitment;
const moment = require("moment");

exports.getAllRecruitment = (req, res) => {
    Recruitment.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};

exports.singleRecruitment = (req, res) => {
  try {
    Recruitment.findOne({ _id: req.params.id }, function (err, result) {
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

  Recruitment.findOne({
    code: body.code,
  }).exec((err, u) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (u) {
      res.status(400).send({
        message: "Mã tin tuyển dụng đã tồn tại! Vui lòng kiểm tra lại.",
      });
      return;
    } else {
      const recruitmentItem = new Recruitment({
        code: body.code,
        name: body.name,
        description: body.description,
        content: body.content,
        img: req.protocol + "://" + req.get("host") + "\\" + file["path"],
        career: body.career,
        workingForm: body.workingForm,
        wage: body.wage,
        experience: body.experience,
        level: body.level,
        deadline: new Date(moment(body.deadline, "DD/MM/YYYY")),
      });

      recruitmentItem.save((err, recruitmentItem) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          res.send({ message: "Thêm thành công tin tuyển dụng mới!" });
        }
      });
    }
  });
};

exports.edit = async (req, res) => {
  try {
    const body = req.body;
    const file = req.files[0];

    console.log();

    let img = "";

    if (body.img) {
      img = body.img;
    } else {
      img =
        req.protocol +
        "://" +
        req.get("host") +
        "/uploads/recruitment/" + body.code + "/" +
        file.filename;
    }
    const id = body.id;

    Recruitment.findById(id, (err, recruitment) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      recruitment.code = body.code;
      recruitment.name = body.name;
      recruitment.description = body.description;
      recruitment.content = body.content;
      recruitment.img = img;
      recruitment.career = body.career;
      recruitment.workingForm = body.workingForm;
      recruitment.wage = body.wage;
      recruitment.experience = body.experience;
      recruitment.level = body.level;
      recruitment.deadline = new Date(moment(body.deadline, "DD/MM/YYYY"));;
      recruitment.save();
      res.send({ message: "Cập nhật dữ liệu thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.body.id;

    Recruitment.findOne({ _id: id }, function async(err, res) {
      if (err) throw err;
      process.chdir("uploads");
      process.chdir("recruitment");
      const length = res.img.split("\\").length;
      const item = res.img.split("\\")[length - 1];

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

    Recruitment.findByIdAndDelete(id, function (err) {
      if (err) {
        res.status(500).send({ message: err });
      }
      res.send({ message: "Xóa thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};
