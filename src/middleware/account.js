const multer = require("multer");

function Convert(string){
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/account/");
  },
  filename: (req, file, cb) => {
    const name = req.body.fullname;
    const filename = Convert(file.originalname).replaceAll(' ','-').toLowerCase()

    cb(null, filename);
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
