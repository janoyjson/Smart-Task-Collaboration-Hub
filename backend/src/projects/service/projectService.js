const projectRepository = require("../repository/projectRepository");

exports.createProject = async (data) => {
  const { project_name, description, created_by } = data;

  if (!project_name || !description) {
    throw new Error("Required field is not fill in yet!!!");
  }

  const projectData = {
    project_name,
    description,
    created_by,
  };
  const newProject = await projectRepository.createProject(projectData);
  return newProject;
};

exports.getProjects = async (id) => {
  const getAllProject = await projectRepository.getProjects(id);
  return getAllProject;
};

exports.getMemberProjects = async (id) => {
  const getMemberProject = await projectRepository.getMemberProjects(id);
  return getMemberProject;
};

exports.getDetailProject = async (id) => {
  const getDetailProject = await projectRepository.getDetailProject(id);
  return getDetailProject;
};

exports.updatePorjectInfo = async (data) => {
  const { project_id, project_name, description, created_by } = data;

  const project = await projectRepository.findProjectbyID(project_id);

  if (!project) {
    throw new Error("Project not Found!!");
  }

  const updateData = {
    project_id,
    project_name: project_name ?? project.project_name,
    description: description ?? project.description,
    created_by,
  };

  const newProjectInfo = await projectRepository.updateProjectInfo(updateData);
  return newProjectInfo;
};

exports.deleteProject = async (projectId) => {
  if (!projectId) {
    throw new Error("Required field is not fill in yet!!!");
  }

  const project = await projectRepository.getDetailProject(projectId);
  if (!project) {
    throw new Error("Project not Found!!");
  }

  const deletedProject = await projectRepository.deleteProject(projectId);
  return deletedProject;
};
