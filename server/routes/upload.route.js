const { Router } = require("express");
const { imageController } = require("../controllers/images.controller");
const fileMiddleware = require("../middleware/file");

const router = Router();

router.post("/images", fileMiddleware.single("img"), imageController.addPhoto);
router.get("/images", imageController.getImages);

module.exports = router;
