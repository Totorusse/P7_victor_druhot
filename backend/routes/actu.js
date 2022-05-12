const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const actuCtrl = require("../controllers/actu");
const stuffCtrl = require("../controllers/stuff");

router.get("/actu", auth, multer, stuffCtrl.getAllArticles);
router.get("/actu/:id", auth, multer, actuCtrl.getOneArticle);
router.get("/actu/:id/comment", auth, multer, actuCtrl.getAllComments);
router.get("/profile", auth, multer, actuCtrl.getMyProfile);
router.delete("/actu/:id", auth, multer, actuCtrl.deleteArticle);
router.delete("/comment", auth, actuCtrl.deleteComment);
router.put("/actu/:id", auth, multer, actuCtrl.updateArticle);
router.put("/actu/:id/comment", auth, actuCtrl.updateComment);
router.post("/pub", auth, multer, actuCtrl.publish);
router.post("/images", auth, multer);
router.post("/actu", auth, actuCtrl.comment);
router.get("/images", auth, multer);

module.exports = router;
