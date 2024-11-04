const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const colorsRoutes = require("./routes/colors");
const multer = require("multer");
const cors = require("cors");
const db = require("./models/db");
const mongoose = require("mongoose");
const { create } = require("./models/colorPaletteModel");
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

db.connect();

db.connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on ${host}${port}`);
    });
  create({
    name: "Color Palette 1",
    colors: [
      {
        name: "Color 1",
        hex: "#FF5733",
        rgb: { r: 255, g: 87, b: 51 },
      },
      {
        name: "Color 2",
        hex: "#33FF57",
        rgb: { r: 51, g: 255, b: 87 },
      },
      {
        name: "Color 3",
        hex: "#5733FF",
        rgb: { r: 87, g: 51, b: 255 },
      },
    ],
  });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1); // Exit with an error code
  });
