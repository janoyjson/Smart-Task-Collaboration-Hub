const projectService = require("../service/projectService");

exports.createProject = async (req, res) => {
  try {
    const projectData = {
      project_name: req.body.project_name,
      description: req.body.description,
      created_by: req.user.user_id,
    };

    const newProject = await projectService.createProject(projectData);

    return res.status(201).json({
      success: true,
      message: "Project Created Successfully!!",
      data: newProject,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const allProjects = await projectService.getProjects(req.user.user_id);
    return res.status(200).json({
      success: true,
      data: allProjects,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMemberProjects = async (req, res) => {
  try {
    const memberProjects = await projectService.getMemberProjects(req.user.user_id);
    return res.status(200).json({
      success: true,
      data: memberProjects,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProject = async (req, res) => {
  try {
    const getProject = await projectService.getDetailProject(req.params.id);
    return res.status(200).json({
      success: true,
      data: getProject,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const updateData = {
      project_id: req.params.id,
      project_name: req.body.project_name,
      description: req.body.description,
      created_by: req.user.user_id,
    };
    const updateProject = await projectService.updatePorjectInfo(updateData);
    return res.status(200).json({
      success: true,
      data: updateProject,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await projectService.deleteProject(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully!!",
      data: deletedProject,
    });
  } catch (error) {
    return res.status(error.message === "Project not Found!!" ? 404 : 400).json({
      success: false,
      message: error.message,
    });
  }
};
