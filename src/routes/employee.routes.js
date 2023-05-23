const controller = require("../controllers/employee.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
    );
    next();
  });

  app.post("/api/login", controller.login);

  app.post("/api/logout", controller.logout);

  app.get('/api/check-in-out/:UserEnrollNumber/:TimeDate', controller.getCheckInOut);

  app.get('/api/employees', controller.getAllEmployee);
};
