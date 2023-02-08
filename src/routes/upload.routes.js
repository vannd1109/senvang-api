const controller = require("../controllers/file.controller");
const upload = require ("../middleware/upload");

module.exports = function (app) {
  app.post("/upload", upload.single('avatar'), controller.upload);
  // app.get("/files", controller.getListFiles);
  // app.get("/files/:name", controller.download);
};
