const controller = require("../controllers/banner.controller");
const  upload = require("../middleware/banner");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/banners", controller.getAllBanner);
  app.get("/api/banners/view/:id", controller.singleBanner);
  app.post("/api/banners/add", upload.any("banners"), controller.add);
  app.post("/api/banners/edit",upload.any("banners"), controller.edit);
  app.post("/api/banners/delete", controller.delete);
};
