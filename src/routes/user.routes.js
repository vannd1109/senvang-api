const { authJwt } = require("../middleware/index");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/test/user",
    [authJwt.verifyToken, authJwt.isUser],
    controller.userBoard
  );

  app.get(
    "/api/test/guest",
    [authJwt.verifyToken, authJwt.isGuest],
    controller.guestBoard
  );
  app.get("/api/users/all", controller.getAllUser);
};
