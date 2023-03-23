const nodemailer = require("nodemailer");

const sendEmail = (subject, message, send_to, sent_from, reply_to) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "vannd.dev1109@gmail.com",
      pass: "Vannd.dev30042019@@@",
    },
  });

  const options = {
    from: sent_from,
    to: send_to,
    reply_to: reply_to,
    subject: subject,
    html: message,
  };

  // Send Email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
