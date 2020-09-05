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
router.get("/login", loginUser);

// manag user
router.get("/", authAdmin, getAllUser);
router.get("/:id", authAdmin, getUserById);
// PATCH
router.patch("/:id", authAdmin, patchUser);

// DELETE
router.delete("/:id", authAdmin, deleteUser);

module.exports = router;
