const express = require("express");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors());

app.use('/public', express.static('public'));

// Configurations for "body-parser"
app.use(bodyParser.urlencoded({extended: true}))

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

const db = require("./models");
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
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/role.routes")(app);
require("./routes/upload.routes")(app);

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
