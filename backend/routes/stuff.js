const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const persoCtrl = require("../controllers/perso");

router.get("/stuff", auth, multer, persoCtrl.getAllInfo);
module.exports = router;
