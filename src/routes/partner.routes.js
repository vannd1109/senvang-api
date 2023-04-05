const controller = require("../controllers/partner.controller");
const upload = require("../middleware/partner");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/partners", controller.getAllPartner);
  app.get("/api/partners/view/:id", controller.singlePartner);
  app.post("/api/partners/add", upload.any("partner"), controller.add);
  app.post("/api/partners/edit", upload.any("partner"), controller.edit);
  app.post("/api/partners/delete", controller.delete);
};
