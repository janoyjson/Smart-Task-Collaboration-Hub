const express = require("express");
const router = express.Router();
const authetincateToken = require("../../middleware/authenticateToken");

const userController = require("../controller/userController");
const authorize = require("../../middleware/authorize");

router.post("/register", (req, res) => {
  userController.Register(req, res);
});

router.post("/login", (req, res) => {
  userController.Login(req, res);
});

router.get("/profile", authetincateToken, (req, res) => {
  userController.getUserProfile(req, res);
});

router.get("/search", authetincateToken, authorize('admin'), (req, res) => {
  userController.getUserbyNameorEmail(req, res);
});

exports.userRouter = router;
