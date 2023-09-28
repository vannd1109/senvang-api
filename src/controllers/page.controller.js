const fs = require("fs");
const process = require("process");
const db = require("../models");
const Page = db.page;

exports.getAllPage = (req, res) => {
  Page.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};

exports.singlePage = (req, res) => {
  try {
    Page.findOne({ _id: req.params.id }, function (err, result) {
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

  Page.findOne({
    title: body.title,
  }).exec((err, u) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (u) {
      res.status(400).send({
        message: "Trang đã tồn tại! Vui lòng kiểm tra lại.",
      });
      return;
    } else {
      const pageItem = new Page({
        title: body.title,
        catePage: body.catePage,
        description: body.description,
        content: body.content,
        slug: body.slug,
        childrenPage: body.childrenPage,
        img: req.protocol + "://" + req.get("host") + "\\" + file["path"],
      });

      pageItem.save((err, pageItem) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          res.send({ message: "Thêm thành công trang mới!" });
        }
      });
    }
  });
};

function Convert(string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

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
        "/uploads/page/" + Convert(body.title).toLowerCase().replaceAll(" ","-") + "/" +
        file.filename;
    }
    const id = body.id;

    Page.findById(id, (err, page) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      page.title = body.title;
      page.description = body.description;
      (page.content = body.content), (page.img = img);
      page.parentPage = body.parentPage;
      page.slug = body.slug;

      page.save();
      res.send({ message: "Cập nhật dữ liệu thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};

function Convert(string) {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

exports.delete = async (req, res) => {
  try {
    const id = req.body.id;

    Page.findOne({ _id: id }, function async(err, res) {
      if (err) throw err;
      process.chdir("uploads");
      process.chdir("page");

      const title = Convert(res.title).toLowerCase().replaceAll(" ", "-");

      fs.rmdir(
        process.cwd() + "\\" + title,
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

    Page.findByIdAndDelete(id, function (err) {
      if (err) {
        res.status(500).send({ message: err });
      }
      res.send({ message: "Xóa thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};
