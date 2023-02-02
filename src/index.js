require("dotenv").config();

const cors = require("cors");
const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const routes = require("./routes/routes");

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
app.use(express.json());

app.use(cors());

// Route
app.use("/api", routes);

app.use("/login", (req, res) => {
  res.send({
    token: "test123",
  });
});

app.listen(3001, () => {
  console.log(`Server Started at ${3000}`);
});
