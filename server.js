const express = require("express");
const cors = require("cors");
const videosRouter = require("./routes/videos.routes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// API
app.use("/api/videos", videosRouter);

app.get("/", (req, res) => {
  res.send("Kino backend ishlayapti 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server port:", PORT));
