const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/product/");
  },
  filename: (req, file, cb) => {

    cb(null, file.originalname);
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer(
  { 
    storage: storage,
    filefilter: filefilter,
    limits: { fieldSize: 25 * 1024 * 1024 }
  });

module.exports = upload;
