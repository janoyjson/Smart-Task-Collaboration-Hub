const projectRepository = require("../../projects/repository/projectRepository");
const userRepository = require("../../users/repository/userRepository");
const projectMemberRepository = require("../repository/projectMemberRepository");

exports.addMemberToProject = async (data) => {
  const { project_id, user_id } = data;

  if (!project_id || !user_id) {
    throw new Error("Required field is not fill in yet!!!");
  }

  const project = await projectRepository.getDetailProject(project_id);
  if (!project) {
    throw new Error("Project not Found!!");
  }

  const user = await userRepository.getUsersbyID(user_id);
  if (!user) {
    throw new Error("User not found!!");
  }

  if (String(user.user_role).toUpperCase() !== "MEMBER") {
    throw new Error("Only Member can be added to project");
  }

  const existingMember = await projectMemberRepository.findMemberByProjectAndUser(
    project_id,
    user_id,
  );

  if (existingMember) {
    throw new Error("Member already exists in this project");
  }

  const newMember = await projectMemberRepository.addMemberToProject({
    project_id,
    user_id,
  });

  return newMember;
};

exports.deleteMemberFromProject = async (data) => {
  const { project_id, user_id } = data;

  if (!project_id || !user_id) {
    throw new Error("Required field is not fill in yet!!!");
  }

  const project = await projectRepository.getDetailProject(project_id);
  if (!project) {
    throw new Error("Project not Found!!");
  }

  const member = await projectMemberRepository.findMemberByProjectAndUser(
    project_id,
    user_id,
  );

  if (!member) {
    throw new Error("Member not found in this project");
  }

  const deletedMember = await projectMemberRepository.deleteMemberFromProject(
    project_id,
    user_id,
  );

  return deletedMember;
};