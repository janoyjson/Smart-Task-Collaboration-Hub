const userService = require("../service/userService");

exports.Register = async (req, res) => {
  try {
    const newUser = await userService.Register(req.body);

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully!!!",
      data: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const userLogin = await userService.Login(req.body);
    return res.status(200).json({
      success: true,
      message: "Login Successfull!!",
      data: userLogin,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userProfile = await userService.getUserProfile(req.user.user_id);
    return res.status(200).json({
      success: true,
      data: userProfile,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserbyNameorEmail = async (req, res) => {
  try {
    const { key } = req.query;

    const userList = await userService.getUserbyNameorEmail(key);
    return res.status(200).json({
      success: true,
      data: userList,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
