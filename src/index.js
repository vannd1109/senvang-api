const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConfig = require("./config/db.config");
const cookieSession = require("cookie-session");
const path = require("path");

const db = require("./models");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Static Folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "senvang-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
  })
);

const Role = db.role;

db.mongoose.set("strictQuery", false);

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Sen Vàng." });
});

// routes
require("./routes/role.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/customer.routes")(app);
require("./routes/cateProduct.routes")(app);
require("./routes/product.routes")(app);
require("./routes/productGroup.routes")(app);
require("./routes/slider.routes")(app);
require("./routes/page.routes")(app);
require("./routes/cateNew.routes")(app);
require("./routes/new.routes")(app);
require("./routes/media.routes")(app);
require("./routes/banner.routes")(app);
require("./routes/menu.routes")(app);
require("./routes/feedback.routes")(app);
require("./routes/partner.routes")(app);
require("./routes/infoCompany.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        value: "User",
        label: "Người dùng",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        value: "Admin",
        label: "Quản trị viên",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });

      new Role({
        value: "Guest",
        label: "Khách hàng",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'guest' to roles collection");
      });
    }
  });
}
