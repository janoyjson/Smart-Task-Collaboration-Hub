const projectRepository = require("../../projects/repository/projectRepository");
const userRepository = require("../../users/repository/userRepository");
const projectMemberRepository = require("../../projectMember/repository/projectMemberRepository");
const taskRepository = require("../repository/taskRepository");

const statusOrder = ["To do", "In Progress", "Review", "Done"];

const normalizeStatus = (value) => {
  if (!value) {
    return null;
  }

  const normalized = String(value).trim().toLowerCase().replace(/[-_]+/g, " ").replace(/\s+/g, " ");

  if (normalized === "to do") {
    return "To do";
  }

  if (normalized === "in progress") {
    return "In Progress";
  }

  if (normalized === "review") {
    return "Review";
  }

  if (normalized === "done") {
    return "Done";
  }

  return null;
};

exports.createTask = async (data) => {
  const { project_id, title, description, assigned_to, due_date } = data;

  if (!project_id || !title || !description || !assigned_to) {
    throw new Error("Required field is not fill in yet!!!");
  }

  const project = await projectRepository.getDetailProject(project_id);
  if (!project) {
    throw new Error("Project not Found!!");
  }

  const assignedUser = await userRepository.getUsersbyID(assigned_to);
  if (!assignedUser) {
    throw new Error("Assigned user not found!!");
  }

  if (String(assignedUser.user_role).toUpperCase() !== "MEMBER") {
    throw new Error("Only Member can be assigned to task");
  }

  const projectMember = await projectMemberRepository.findMemberByProjectAndUser(
    project_id,
    assigned_to,
  );

  if (!projectMember) {
    throw new Error("Assigned user is not a member of this project");
  }

  const newTask = await taskRepository.createTask({
    project_id,
    title,
    task_description: description,
    assigned_to,
    due_date,
  });

  return newTask;
};

exports.getTasksByProject = async (projectId) => {
  if (!projectId) {
    throw new Error("Required field is not fill in yet!!!");
  }

  const project = await projectRepository.getDetailProject(projectId);
  if (!project) {
    throw new Error("Project not Found!!");
  }

  const tasks = await taskRepository.getTasksByProject(projectId);
  return tasks;
};

exports.updateTask = async (data) => {
  const { task_id, title, description, assigned_to, due_date } = data;

  if (!task_id) {
    throw new Error("Required field is not fill in yet!!!");
  }

  const task = await taskRepository.findTaskByID(task_id);
  if (!task) {
    throw new Error("Task not Found!!");
  }

  const project = await projectRepository.getDetailProject(task.project_id);
  if (!project) {
    throw new Error("Project not Found!!");
  }

  let nextAssignedTo = task.assigned_to;
  if (assigned_to !== undefined) {
    const assignedUser = await userRepository.getUsersbyID(assigned_to);
    if (!assignedUser) {
      throw new Error("Assigned user not found!!");
    }

    if (String(assignedUser.user_role).toUpperCase() !== "MEMBER") {
      throw new Error("Only Member can be assigned to task");
    }

    const projectMember = await projectMemberRepository.findMemberByProjectAndUser(
      task.project_id,
      assigned_to,
    );

    if (!projectMember) {
      throw new Error("Assigned user is not a member of this project");
    }

    nextAssignedTo = assigned_to;
  }

  const updateData = {
    task_id,
    title: title ?? task.title,
    task_description: description ?? task.task_description,
    assigned_to: nextAssignedTo,
    due_date: due_date ?? task.due_date,
  };

  const updatedTask = await taskRepository.updateTask(updateData);
  return updatedTask;
};

exports.updateTaskStatus = async (data) => {
  const { task_id, newStatus } = data;

  if (!task_id || !newStatus) {
    throw new Error("Required field is not fill in yet!!!");
  }

  const task = await taskRepository.findTaskByID(task_id);
  if (!task) {
    throw new Error("Task not Found!!");
  }

  const currentStatus = normalizeStatus(task.task_status);
  const targetStatus = normalizeStatus(newStatus);

  if (!targetStatus) {
    throw new Error("Invalid task status!!");
  }

  const currentIndex = statusOrder.indexOf(currentStatus);
  const targetIndex = statusOrder.indexOf(targetStatus);

  if (currentIndex === -1) {
    throw new Error("Invalid current task status!!");
  }

  if (targetIndex !== currentIndex + 1) {
    throw new Error("Invalid task status transition!!");
  }

  const updatedTask = await taskRepository.updateTaskStatus(task_id, targetStatus);

  if (targetStatus === "Done") {
    return updatedTask;
  }

  return updatedTask;
};

exports.deleteTask = async (taskId) => {
  if (!taskId) {
    throw new Error("Required field is not fill in yet!!!");
  }

  const task = await taskRepository.findTaskByID(taskId);
  if (!task) {
    throw new Error("Task not Found!!");
  }

  const deletedTask = await taskRepository.deleteTask(taskId);
  return deletedTask;
};