const controller = require("../controllers/slider.controller");
const  upload = require("../middleware/slider");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/sliders/add", upload.any("slider"), controller.add);

  app.get("/api/sliders", controller.getAllSlider);

//   app.get("/api/media/:id", controller.singleAlbum)
};
