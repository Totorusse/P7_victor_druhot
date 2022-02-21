const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
//const multer = require("../middleware/multer-config");

const actuCtrl = require("../controllers/actu");

router.get("/actu", auth, actuCtrl.getAllArticles);
router.get("/actu/:id", auth, actuCtrl.getOneArticle);
router.delete("/actu/:id", auth, actuCtrl.deleteArticle);
router.put("/actu/:id", auth, actuCtrl.updateArticle);
router.post("/pub", auth, actuCtrl.publish);

module.exports = router;
