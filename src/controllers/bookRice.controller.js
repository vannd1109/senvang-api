const db = require("../models");
const BookRice = db.bookRice;

exports.add = (req, res) => {
  try {
    const body = req.body;

    const bookRice = new BookRice({
      startDate: body.startDateSelect,
      endDate: body.endDateSelect,
      closeDate: body.closeDateSelect,
      menu: body.arrBookRice,
      status: body.statusBookrice,
    });

    if (body.statusBookrice) {
      BookRice.find({}, function (err, bookriceList) {
        if (err) throw err;
        for (let i = 0; i < bookriceList.length; i++) {
          const menuItem = bookriceList[i];
          menuItem.status = false;
          bookriceList[i].save();
        }
      });
    }

    bookRice.save((err, bookRice) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        res.send({ message: "Thêm thành công thực đơn mới!" });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getAllBookRice = (req, res) => {
  BookRice.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};

exports.singleBookRice = (req, res) => {
  try {
    BookRice.findOne({ _id: req.params.id }, function (err, result) {
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
    const id = body.id;
    BookRice.find({}, function (err, bookriceList) {
      if (err) throw err;
      if (bookriceList.some((item) => item.status === true)) {
        for (let i = 0; i < bookriceList.length; i++) {
          if(bookriceList[i].id === id) continue;
          const menuItem = bookriceList[i];
          menuItem.status = false;
          bookriceList[i].save();
        }
      }
    });

    BookRice.findById(id, (err, bookrice) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      bookrice.startDate = body.startDateSelect;
      bookrice.endDate = body.endDateSelect;
      bookrice.closeDate = body.closeDateSelect;
      bookrice.menu = body.arrBookRice;
      bookrice.status = body.statusBookrice;

      bookrice.save();
      res.send({ message: "Cập nhật dữ liệu thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.body.id;

    BookRice.findByIdAndDelete(id, function (err) {
      if (err) {
        res.status(500).send({ message: err });
      }
      res.send({ message: "Xóa thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};
