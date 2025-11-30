const db = require("../db");

// GET - hamma videolar
exports.getVideos = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM videos");
  res.json(rows);
};

// GET - id bo’yicha bitta video
exports.getVideo = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM videos WHERE id = ?", [
    req.params.id,
  ]);
  res.json(rows[0] || null);
};

// POST - yangi video qo’shish
exports.createVideo = async (req, res) => {
  const { raqam, video } = req.body;

  const [result] = await db.query(
    "INSERT INTO videos (raqam, video) VALUES (?, ?)",
    [raqam, video]
  );

  res.json({
    message: "Yaratildi",
    id: result.insertId,
  });
};

// PUT - o’zgartirish
exports.updateVideo = async (req, res) => {
  const { raqam, video } = req.body;

  await db.query(
    "UPDATE videos SET raqam = ?, video = ? WHERE id = ?",
    [raqam, video, req.params.id]
  );

  res.json({ message: "O'zgartirildi" });
};

// DELETE - o’chirish
exports.deleteVideo = async (req, res) => {
  await db.query("DELETE FROM videos WHERE id = ?", [req.params.id]);
  res.json({ message: "O'chirildi" });
};
