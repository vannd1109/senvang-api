const controller = require("../controllers/cateNew.controller");
const  upload = require("../middleware/cateNew");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/cate-new", controller.getAllCateNew);
  app.post("/api/cate-new/add", upload.any("cate-new"), controller.add);
  app.get("/api/cate-new/view/:id", controller.singleCateNew);
  app.post("/api/cate-new/edit",upload.any("cate-product"), controller.edit);
};
