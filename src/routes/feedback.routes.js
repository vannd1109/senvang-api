const controller = require("../controllers/feedback.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/feedback", controller.getAllFeedback);
  app.post("/api/feedback/add", controller.add);
  app.get("/api/feedback/view/:email", controller.singleFeedback);
  app.get("/api/feedback/:id", controller.viewFeedback);
  app.post("/api/feedback/edit", controller.edit);
  app.post("/api/feedback/delete", controller.delete);
};
