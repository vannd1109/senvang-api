const controller = require("../controllers/recruitment.controller");
const upload = require("../middleware/recruitment")

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/recruitments", controller.getAllRecruitment);
  app.get("/api/recruitments/view/:id", controller.singleRecruitment);
  app.post("/api/recruitments/add", upload.any("recruitments"), controller.add);
  app.post("/api/recruitments/edit", upload.any("recruitments"), controller.edit);
  app.post("/api/recruitments/delete", controller.delete);
};
