const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const persoCtrl = require("../controllers/perso");

router.get("/list-perso", multer, persoCtrl.getAllPerso);
module.exports = router;
