const controller = require("../controllers/base.controller");

module.exports = function (app) {
  app.post("/api/base", controller.getDataFromBase);
};
