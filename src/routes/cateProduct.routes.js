const controller = require("../controllers/cateProduct.controller");
const  upload = require("../middleware/cateProduct");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/cate-product/add", upload.any("cate-product"), controller.add);
  app.get("/api/cate-product", controller.getAllCateProduct);
  app.get("/api/cate-product/:id", controller.getAllProductByCateId);
  app.get("/api/cate-product/view/:id", controller.singleProduct);
  app.post("/api/cate-product/edit",upload.any("cate-product"), controller.edit);
};
