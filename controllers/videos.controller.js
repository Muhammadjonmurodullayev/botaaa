const pool = require("../db");
const cloudinary = require("./cloudinary");

exports.createVideo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) return res.status(400).json({ msg: "title majburiy" });
    if (!req.file) return res.status(400).json({ msg: "video fayl majburiy" });

    let fileUrl = null;

    if (process.env.USE_CLOUDINARY === "true") {
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "video",
        folder: "cinema"
      });
      fileUrl = uploadRes.secure_url;
    } else {
      fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const [result] = await pool.query(
      "INSERT INTO videos (title, file_url) VALUES (?, ?)",
      [title, fileUrl]
    );

    res.json({ id: result.insertId, title, file_url: fileUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listVideos = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM videos ORDER BY id DESC");
  res.json(rows);
};

exports.getVideo = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM videos WHERE id = ?", [
    req.params.id
  ]);
  if (!rows.length) return res.status(404).json({ msg: "topilmadi" });
  res.json(rows[0]);
};

exports.updateVideo = async (req, res) => {
  const { title } = req.body;
  let fileUrl = null;

  if (req.file) {
    fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  }

  await pool.query(
    "UPDATE videos SET title = ?, file_url = COALESCE(?, file_url) WHERE id = ?",
    [title, fileUrl, req.params.id]
  );

  res.json({ msg: "yangilandi" });
};

exports.deleteVideo = async (req, res) => {
  await pool.query("DELETE FROM videos WHERE id = ?", [req.params.id]);
  res.json({ msg: "o'chirildi" });
};
