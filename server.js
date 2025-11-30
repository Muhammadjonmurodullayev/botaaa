const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const videosRouter = require("./routes/videos.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/videos", videosRouter);

app.get("/", (req, res) => {
  res.send("Beket ishlayapti 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server port:", PORT));
