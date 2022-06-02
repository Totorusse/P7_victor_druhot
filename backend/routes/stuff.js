const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const stuffCtrl = require("../controllers/stuff");

router.get("/stuff", auth, multer, stuffCtrl.getAllInfo);
router.post("/stuff", auth, multer, stuffCtrl.getItemCode);
module.exports = router;
