const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

router.get("/admin", userCtrl.getAllUsers);
router.post("/sign", userCtrl.create);
router.post("/admin", userCtrl.choosePerso);
router.put("/perso", userCtrl.choosePerso);
router.post("/login", userCtrl.login);
router.delete("/profile", auth, userCtrl.deleteProfile);

module.exports = router;
