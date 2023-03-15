const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const UserController = require("../controllers/user_controller.js");
router.get("/", UserController.home);
router.post("/register", UserController.register);
router.put("/update", protect, UserController.update);
router.post("/login", UserController.login);
router.get("/verifyEmail/:token", UserController.verifyEmail);
router.post("/getResetPasswordLink", UserController.getResetPasswordLink);
router.post("/resetPassword/:token", UserController.resetPassword);
router.get("/allUsers", protect, UserController.allUsers);
router.get("/getuser/:userid", protect, UserController.getuser);
router.post("/writetous", UserController.writetous);
module.exports = router;