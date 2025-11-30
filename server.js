const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const videosRouter = require("./routes/videos.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Lokalda video yuklash uchun "uploads" ochamiz
app.use("/uploads", express.static("uploads"));

// API
app.use("/api/videos", videosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server ishladi port:", PORT);
});
