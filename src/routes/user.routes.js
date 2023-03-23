const { authJwt } = require("../middleware/index");
const controller = require("../controllers/user.controller");
const upload = require("../middleware/account");

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
  app.get("/api/users/view/:id", controller.getUserById);
  app.post("/api/users/edit", upload.single("photo"), controller.edit);
  app.post("/api/users/delete", controller.delete);
  app.get("/api/users/find/:email", controller.findUserByEmail);
  app.post("/api/users/change-password", controller.changePassword);
  app.post("/api/users/:id", controller.singleUser);
  app.post("/api/sendemail/", controller.sendEmail);
};
