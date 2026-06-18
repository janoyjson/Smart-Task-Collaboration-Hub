const taskService = require("../service/taskService");

exports.createTask = async (req, res) => {
  try {
    const taskData = {
      project_id: req.params.projectId,
      title: req.body.title,
      description: req.body.description,
      assigned_to: req.body.assigned_to,
      due_date: req.body.due_date,
    };

    const newTask = await taskService.createTask(taskData);

    return res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: newTask,
    });
  } catch (error) {
    const statusCode =
      error.message === "Project not Found!!" ||
      error.message === "Assigned user not found!!" ||
      error.message === "Assigned user is not a member of this project"
        ? 404
        : error.message === "Only Member can be assigned to task"
          ? 400
          : 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTasksByProject = async (req, res) => {
  try {
    const tasks = await taskService.getTasksByProject(req.params.projectId);

    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    const statusCode = error.message === "Project not Found!!" ? 404 : 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskData = {
      task_id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      assigned_to: req.body.assigned_to,
      due_date: req.body.due_date,
    };

    const updatedTask = await taskService.updateTask(taskData);

    return res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: updatedTask,
    });
  } catch (error) {
    const statusCode =
      error.message === "Task not Found!!" ||
      error.message === "Project not Found!!" ||
      error.message === "Assigned user not found!!" ||
      error.message === "Assigned user is not a member of this project"
        ? 404
        : error.message === "Only Member can be assigned to task"
          ? 400
          : 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const taskData = {
      task_id: req.params.id,
      newStatus: req.body.newStatus,
    };

    const updatedTask = await taskService.updateTaskStatus(taskData);

    return res.status(200).json({
      success: true,
      message: "Task status updated successfully.",
      data: updatedTask,
    });
  } catch (error) {
    const statusCode =
      error.message === "Task not Found!!" ? 404 : 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await taskService.deleteTask(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
      data: deletedTask,
    });
  } catch (error) {
    const statusCode = error.message === "Task not Found!!" ? 404 : 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};