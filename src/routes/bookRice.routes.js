const controller = require("../controllers/bookRice.controller");
const  upload = require("../middleware/book-rice");

module.exports = function (app) {
  // app.use(function (req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   next();
  // });
  app.post("/api/book-rice/add",upload.any("book-rice"), controller.add);
  app.get("/api/book-rice", controller.getAllBookRice);
  app.get("/api/book-rice/view/:id", controller.singleBookRice);
  app.post("/api/book-rice/edit", controller.edit);
  app.post("/api/book-rice/delete", controller.delete);
};
