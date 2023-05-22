const config = require("../config/auth.config");
const db = require("../models");
const Employee = db.employee;
const { DBConnectionWiseEyeOn } = require("../connection/conn");
const { DBConnectionEpad180 } = require("../connection/conn");
const moment = require("moment");
moment.locale("vi");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = (req, res) => {
  Employee.findOne({
    username: req.body.username,
  }).exec((err, employee) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!employee) {
      return res.status(404).send({ message: "Người dùng không tồn tại." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      employee.password
    );

    if (!passwordIsValid) {
      return res
        .status(400)
        .send({ accessToken: null, message: "Mật khẩu không đúng!" });
    } else {
      const token = jwt.sign({ id: employee.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: employee.emplID,
        fullname: employee.fullname,
        gender: employee.gender,
        department: employee.department,
        accessToken: token,
      });
    }
  });
};

exports.logout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "Bạn đã đăng xuất khỏi hệ thống!" });
  } catch (err) {
    this.next(err);
  }
};

exports.getCheckInOut = async (req, res) => {
  const { UserEnrollNumber, TimeDate } = req.params;

  const connWiseEyeOn = await new DBConnectionWiseEyeOn().getConnection();
  const resultWiseEyeOn = await connWiseEyeOn
    .request()
    .query(
      `SELECT * FROM CheckInOut WHERE UserEnrollNumber = ${UserEnrollNumber} AND TimeDate = '${TimeDate}'`
    );
  connWiseEyeOn.close();

  const connEpad180 = await new DBConnectionEpad180().getConnection();
  const resultEpad180 = await connEpad180
    .request()
    .query(
      `SELECT * FROM IC_AttendanceLog WHERE EmployeeATID = '0${UserEnrollNumber}' AND CheckTime LIKE '${TimeDate}%'`
    );
  connEpad180.close();

  const checkInOutWise = [];
  const checkInOutEpad = [];
  resultWiseEyeOn.recordset.map((item) => {
    checkInOutWise.push(item.TimeStr);
  });
  resultEpad180.recordset.map((item) => {
    checkInOutEpad.push(item.CheckTime);
  });

  let result = checkInOutWise.concat(checkInOutEpad);
  result = result.sort(function (a, b) {
    return new Date(a) - new Date(b);
  });

  const timeCheckInOut = {};

  if (result.length > 1) {
    timeCheckInOut["checkIn"] = moment(result[0]).utc().format("HH:mm");
    timeCheckInOut["checkOut"] = moment(result[result.length - 1])
      .utc()
      .format("HH:mm");
  } else {
    timeCheckInOut["checkIn"] = moment(result[0]).utc().format("HH:mm");
    timeCheckInOut["checkIn"] = "";
  }

  console.log(timeCheckInOut);

  return res.json(timeCheckInOut);
};

exports.getAllEmployee = (req, res) => {
  Employee.find({}, function (err, result) {
    if (err) throw err;
    return res.json(result);
  });
};