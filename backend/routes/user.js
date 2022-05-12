const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

router.post("/sign", userCtrl.create);
router.post("/list-perso", userCtrl.choosePerso);
router.post("/login", userCtrl.login);
router.delete("/profile", auth, userCtrl.deleteProfile);

module.exports = router;
