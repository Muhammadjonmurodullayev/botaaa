const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// test route
app.get("/", (req, res) => {
  res.send("✅ Beket Render.com da ishlayapti!");
});

// agar kerak bo'lsa backend route misoli
app.get("/api/data", (req, res) => {
  res.json([
    { id: 1, name: "Render Backend", status: "Ishlayapti 🚀" },
    { id: 2, name: "Free Tier", status: "Bepul va foydali 💸" },
  ]);
});

// PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ishlayapti: ${PORT}`));
