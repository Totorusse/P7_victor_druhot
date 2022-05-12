const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const stuffCtrl = require("../controllers/stuff");

router.get("/stuff", multer, stuffCtrl.getAllInfo);
module.exports = router;
