const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Render diskka yozmaydi, shuning uchun vaqtincha memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Bu joyga videolarni saqlaymiz (xotirada)
let videos = []; // vaqtinchalik bazamiz

// POST - video yuklash
router.post("/", upload.single("video"), (req, res) => {
  const { title } = req.body;

  if (!title || !req.file) {
    return res.status(400).json({ message: "title yoki video yetishmayapti" });
  }

  const videoObj = {
    id: Date.now(),
    title,
    filename: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
  };

  videos.push(videoObj);

  return res.json({
    message: "Video qabul qilindi",
    data: videoObj,
  });
});

// GET - saqlangan videolarni olish
router.get("/", (req, res) => {
  res.json(videos);
});

module.exports = router;
