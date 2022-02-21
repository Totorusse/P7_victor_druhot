const express = require("express");
const router = express.Router();

const actuCtrl = require("../controllers/actu");

router.get("/actu", actuCtrl.getAllArticles);
router.get("/actu/:id", actuCtrl.getOneArticle);
router.delete("/actu/:id", actuCtrl.deleteArticle);
router.put("/actu/:id", actuCtrl.updateArticle);
router.post("/pub", actuCtrl.publish);

module.exports = router;
