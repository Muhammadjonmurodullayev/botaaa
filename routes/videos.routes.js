const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/videos.controller");

router.get("/", ctrl.getVideos);
router.get("/:id", ctrl.getVideo);
router.post("/", ctrl.createVideo);
router.put("/:id", ctrl.updateVideo);
router.delete("/:id", ctrl.deleteVideo);

module.exports = router;
