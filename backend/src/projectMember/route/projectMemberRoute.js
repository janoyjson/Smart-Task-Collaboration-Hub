const express = require("express");
const router = express.Router();

const projectMemberController = require("../controller/projectMemberController");
const authetincateToken = require("../../middleware/authenticateToken");
const authorize = require("../../middleware/authorize");

router.post("/:id/members", authetincateToken, authorize("admin"), (req, res) => {
  projectMemberController.addMemberToProject(req, res);
});

router.delete("/:id/members/:userId", authetincateToken, authorize("admin"), (req, res) => {
  projectMemberController.deleteMemberFromProject(req, res);
});

module.exports = router;