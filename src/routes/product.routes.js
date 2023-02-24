const controller = require("../controllers/product.controller");
const  upload = require("../middleware/product");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/products", controller.getAllProduct);
  app.post("/api/products/add", upload.any("product"), controller.add);
};
