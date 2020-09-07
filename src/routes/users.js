const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getAllUser,
  getUserById,
  patchUser,
  deleteUser,
} = require("../controller/users");

const { authAdmin } = require("../middleware/Auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", authAdmin, getAllUser);
router.get("/:id", authAdmin, getUserById);
router.patch("/:id", authAdmin, patchUser);
router.delete("/:id", authAdmin, deleteUser);

module.exports = router;
