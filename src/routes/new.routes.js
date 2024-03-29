const controller = require("../controllers/new.controller");
const upload = require("../middleware/new")

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/news", controller.getAllNew);
  app.get("/api/news/view/:id", controller.singleNew);
  app.post("/api/news/add", upload.any("news"), controller.add);
  app.post("/api/news/edit", upload.any("news"), controller.edit);
  app.post("/api/news/delete", controller.delete);
};
