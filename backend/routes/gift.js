const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const giftCtrl = require("../controllers/gift");

router.post("/stuff/gift", auth, giftCtrl.createGift);

module.exports = router;
