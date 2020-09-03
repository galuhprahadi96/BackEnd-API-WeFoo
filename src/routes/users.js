const router = require("express").Router();
const { registerUser, loginUser } = require("../controller/users");

router.post("/register", registerUser);
router.get("/login", loginUser);

module.exports = router;
