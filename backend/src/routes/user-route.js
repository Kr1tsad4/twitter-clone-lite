const express = require("express");

const router = express.Router();

const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user-controller");

router.route("/").get(getAllUser);
router.route("/:id").get(getUserById);
router.route("/").post(createUser);
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);

module.exports = router;
