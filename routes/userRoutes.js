const express = require("express");
const {
  getUser,
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  updateFaviroutes,
} = require("../controllers/userController");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

// get request
router.get("/", getAllUser);

// get specific request
router.get("/:id", getUser);

// post request
router.post("/", createUser);

// update request
router.patch("/:id", updateUser);

// delete request
router.delete("/:id", deleteUser);

// update faviroutes
router.patch("/faviroutes/:id", requireAuth, updateFaviroutes);

module.exports = router;
