const controller = require("../controllers/infoCompany.controller");
const upload = require("../middleware/info-company");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/info-company", controller.getInfoCompany);
  app.post("/api/info-company/edit", upload.any("info-company"), controller.edit);
};
