const multer = require("multer");
const fs = require('fs-extra');

function Convert(string){
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let code = req.body.code;

    let destDir = './uploads/cate-new/'+ Convert(code).toLowerCase().replaceAll(" ","-");

    fs.mkdirsSync(destDir);
    
    cb(null, destDir);
  },
  filename: (req, file, cb) => {
    const filename = Convert(file.originalname).replaceAll(' ','-').toLowerCase()
    cb(
      null,
      filename
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
