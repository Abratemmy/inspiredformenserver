const express = require("express");
const { signup, signin, logout, checkIfTokenisExpired } = require("../controllers/auth.js");

const router = express.Router();

router.post("/register", signup);
router.post("/login", signin);
router.post("/logout", logout)
router.get("/check", checkIfTokenisExpired);


module.exports = router;