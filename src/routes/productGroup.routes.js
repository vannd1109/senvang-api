const controller = require("../controllers/productGroup.controller");
const  upload = require("../middleware/productGroup");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/product-group/add", upload.any("product-group"), controller.add);
  app.get("/api/product-group", controller.getAllProductGroup);
  app.get("/api/product-group/view/:id", controller.singleProductGroup);
  app.post("/api/product-group/edit",upload.any("product-group"), controller.edit);
  app.post("/api/product-group/delete", controller.delete);
};
