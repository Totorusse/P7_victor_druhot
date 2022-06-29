const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

router.get("/admin", userCtrl.getAllUsers);
router.post("/sign", userCtrl.create);
router.post("/admin", userCtrl.choosePerso);
router.put("/perso", userCtrl.choosePerso);
router.put("/stuff/item", auth, userCtrl.equipItem);
router.put("/stuff/give", auth, userCtrl.giveItem);
router.put("/stuff/giveEquipedItem", auth, userCtrl.giveEquipedItem);
router.put("/stuff/received", auth, userCtrl.receivedItem);

router.post("/login", userCtrl.login);

module.exports = router;
