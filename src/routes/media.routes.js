const controller = require("../controllers/media.controller");
const  upload = require("../middleware/media");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/media/all", controller.getAllMedia);
  app.post("/api/media/add", upload.any("album"), controller.add);
  app.get("/api/media/:id", controller.singleAlbum);
  app.post("/api/media/edit", upload.any("album"), controller.edit);
  app.post("/api/media/delete", controller.delete);
};
