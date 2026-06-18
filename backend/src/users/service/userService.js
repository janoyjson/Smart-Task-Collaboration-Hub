const userRepository = require("../repository/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config;
const saltRounds = 10;

exports.Register = async (data) => {
  const { email, password, full_name, user_role } = data;

  if (!email || !password || !full_name || !user_role) {
    throw new Error("Required field is not fill in yet!!!");
  }

  const password_hash = await bcrypt.hash(password, saltRounds);

  const userData = {
    email,
    password_hash,
    full_name,
    user_role,
  };

  const existingUser = await userRepository.findByEmail(email);

  if (!existingUser) {
    const userRegister = await userRepository.Register(userData);
    return userRegister;
  } else {
    throw new Error("Email already existed!");
  }
};

exports.Login = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Required field is not fill in yet!!!");
  }

  const FindUser = await userRepository.findByEmail(email);

  if (!FindUser || !(await bcrypt.compare(password, FindUser.password_hash))) {
    throw new Error("Email or Password is not correct.");
  }

  const token = jwt.sign(
    {
      user_id: FindUser.user_id,
      email: FindUser.email,
      full_name: FindUser.full_name,
      user_role: FindUser.user_role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2m" },
  );

  return {
    token,
    user: {
      user_id: FindUser.user_id,
      email: FindUser.email,
      full_name: FindUser.full_name,
      user_role: FindUser.user_role,
    },
  };
};

exports.getUserProfile = async (id) => {
  const getProfile = await userRepository.getUsersbyID(id);
  return getProfile;
};

exports.getUserbyNameorEmail = async (keyw) => {
  const getUser = await userRepository.getUsersbyNameorEmail(keyw);
  return getUser;
};
