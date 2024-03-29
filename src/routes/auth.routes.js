const controller = require("../controllers/auth.controller");
const upload = require("../middleware/account");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
    );
    next();
  });

  // app.post("/api/auth/signup",verifySignUp.checkDuplicateUsernameOrEmail);
  app.post("/api/auth/signup", upload.single("photo"), controller.signup);

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/signout", controller.signout);
};
