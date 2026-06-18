const projectMemberService = require("../service/projectMemberService");

exports.addMemberToProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { user_id } = req.body;

    const newMember = await projectMemberService.addMemberToProject({
      project_id: projectId,
      user_id,
    });

    return res.status(201).json({
      success: true,
      message: "Member added to project successfully.",
      data: newMember,
    });
  } catch (error) {
    const statusCode =
      error.message === "Project not Found!!" ||
      error.message === "User not found!!"
        ? 404
        : error.message === "Only Member can be added to project"
          ? 400
          : error.message === "Member already exists in this project"
            ? 409
            : 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteMemberFromProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { userId } = req.params;

    const deletedMember = await projectMemberService.deleteMemberFromProject({
      project_id: projectId,
      user_id: userId,
    });

    return res.status(200).json({
      success: true,
      message: "Member removed from project successfully.",
      data: deletedMember,
    });
  } catch (error) {
    const statusCode =
      error.message === "Project not Found!!" ||
      error.message === "Member not found in this project"
        ? 404
        : 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
