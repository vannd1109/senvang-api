const controller = require("../controllers/menu.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/menu", controller.getAllMenu);
  app.post("/api/menu/add", controller.add);
  app.get("/api/menu/view/:id", controller.singleMenu);
  app.post("/api/menu/edit", controller.edit);
  app.post("/api/menu/delete", controller.delete);
};
