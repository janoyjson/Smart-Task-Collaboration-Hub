const express = require("express");
const router = express.Router();

const taskController = require("../controller/taskController");
const authetincateToken = require("../../middleware/authenticateToken");
const authorize = require("../../middleware/authorize");

router.get("/:projectId/tasks", authetincateToken, (req, res) => {
  taskController.getTasksByProject(req, res);
});

router.post("/:projectId/tasks", authetincateToken, authorize("admin"), (req, res) => {
  taskController.createTask(req, res);
});

router.put("/:id", authetincateToken, authorize("admin"), (req, res) => {
  taskController.updateTask(req, res);
});

router.patch("/:id/status", authetincateToken, (req, res) => {
  taskController.updateTaskStatus(req, res);
});

router.delete("/:id", authetincateToken, authorize("admin"), (req, res) => {
  taskController.deleteTask(req, res);
});

module.exports = router;