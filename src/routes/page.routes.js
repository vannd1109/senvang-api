const controller = require("../controllers/page.controller");
const  upload = require("../middleware/page");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/pages", controller.getAllPage);
  app.get("/api/pages/view/:id", controller.singlePage);
  app.post("/api/pages/add", upload.any("pages"), controller.add);
  app.post("/api/pages/edit", upload.any("pages"), controller.edit);
  app.post("/api/pages/delete", controller.delete);
};
