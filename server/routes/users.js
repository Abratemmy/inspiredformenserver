// const express = require("express");
// const { signin, signup } = require("../controllers/user");


// const router = express.Router();

// router.post('/signin', signin);
// router.post('/signup', signup);


// module.exports = router;

const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json("Welcome to the USERS!");
});

module.exports = router;