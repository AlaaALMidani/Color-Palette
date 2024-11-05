const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const colorsRoutes = require("./routes/colors");
const multer = require("multer");
const cors = require("cors");
const db = require("./models/db");
const mongoose = require("mongoose");
const { create, findAll } = require("./models/paletteModel");
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use("/colors", colorsRoutes);
app.use("/colors", (req, res, next) => {
  console.log(req.method, req.url);
  next();
});
const port = 3000;
const host = "http://localhost:";

db.connect()
  .then(async() => {
    app.listen(port, () => {
      console.log(`Server listening on ${host}${port}`);
    });

    await create({ name: "al", email: "a@m.com", password: "we" })
    console.log(await findAll())

  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1); // Exit with an error code
  });
