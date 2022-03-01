const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const actuCtrl = require("../controllers/actu");

router.get("/actu", auth, multer, actuCtrl.getAllArticles);
router.get("/actu/:id", auth, multer, actuCtrl.getOneArticle);
router.get("/actu/:id/comment", auth, multer, actuCtrl.getAllComments);
router.get("/profile", auth, multer, actuCtrl.getMyProfile);
router.delete("/actu/:id", auth, multer, actuCtrl.deleteArticle);
router.put("/actu/:id", auth, multer, actuCtrl.updateArticle);
router.post("/actu/:id", auth, multer, actuCtrl.like);
router.post("/pub", auth, multer, actuCtrl.publish);
router.post("/images", auth, multer);
router.post("/actu", auth, actuCtrl.comment);
router.get("/images", auth, multer);

module.exports = router;
