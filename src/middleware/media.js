const multer = require("multer");
const fs = require('fs-extra');

function Convert(string){
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const title = req.body.title;

    destDir = './uploads/media/'+ Convert(title).replaceAll(' ','-').toLowerCase();

    fs.mkdirsSync(destDir);
    
    cb(null, destDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname
    );
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

const upload = multer({ storage: storage, filefilter: filefilter });

module.exports = upload;
