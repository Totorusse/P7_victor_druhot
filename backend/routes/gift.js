const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const giftCtrl = require("../controllers/gift");

router.post("/stuff/gift", auth, giftCtrl.createGift);
router.put("/admin/don", auth, giftCtrl.updateGift);

module.exports = router;
