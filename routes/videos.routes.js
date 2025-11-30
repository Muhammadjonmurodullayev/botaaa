const router = require("express").Router();
const upload = require("../controllers/upload");
const ctrl = require("../controllers/videos.controller");

// CREATE (video yuklash)
router.post("/", upload.single("video"), ctrl.createVideo);

// GET (hammasi)
router.get("/", ctrl.listVideos);

// GET (bitta)
router.get("/:id", ctrl.getVideo);

// UPDATE (video optional)
router.put("/:id", upload.single("video"), ctrl.updateVideo);

// DELETE
router.delete("/:id", ctrl.deleteVideo);

module.exports = router;
