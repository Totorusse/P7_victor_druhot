const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const persoCtrl = require("../controllers/perso");

router.get("/list-perso", auth, multer, persoCtrl.getAllPerso);
router.post("/perso", auth, multer, persoCtrl.getPersoCode);
router.put("/admin/heros", auth, multer, persoCtrl.updateHeros);

module.exports = router;
