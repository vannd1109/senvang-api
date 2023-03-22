const { feedback } = require("../models");
const db = require("../models");
const Feedback = db.feedback;

exports.getAllFeedback = (req, res) => {
  Feedback.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};

exports.singleFeedback = async (req, res) => {
  try {
    Feedback.findOne({ email: req.params.email }, function (err, result) {
      if (err) throw err;
      return res.json(result);
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.viewFeedback = async (req, res) => {
  try {
    Feedback.findOne({ _id: req.params.id }, function (err, result) {
      if (err) throw err;
      return res.json(result);
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.add = (req, res) => {
  const body = req.body;

  const feedback = new Feedback({
    fullname: body.fullname,
    email: body.email,
    notes: body.notes,
  });

  feedback.save((err, feedback) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      res.send({ message: "Gửi thành công phản hồi!" });
    }
  });
};

exports.edit = async (req, res) => {
  try {
    const body = req.body;
    const id = body.id;
    Feedback.findById(id, (err, feedback) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      feedback.fullname = body.fullname;
      feedback.email = body.email;
      feedback.notes = body.notes;

      feedback.save();
      res.send({ message: "Gửi thành công phản hồi!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.body.id;

    feedback.findByIdAndDelete(id, function (err) {
      if (err) {
        res.status(500).send({ message: err });
      }
      res.send({ message: "Xóa thành công!" });
    });
  } catch (error) {
    console.log(error.message);
  }
};
