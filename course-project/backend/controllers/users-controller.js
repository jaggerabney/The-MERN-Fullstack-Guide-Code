const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user");
const error = require("../models/http-error");

async function getUsers(req, res, next) {
  let users;

  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(error("Couldn't retrieve users!", 500));
  }

  res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
}

async function signup(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(error("Invalid information!", 422));
  }

  const { name, email, password } = req.body;
  let existingUser, hashedPassword, token;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(error("Couldn't create user! Please try again later.", 500));
  }

  if (existingUser) {
    return next(
      error("The provided email already belongs to an account.", 422)
    );
  }

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(error("Couldn't create user! Please try again later.", 500));
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    image: req.file.path,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(error("Couldn't create user! Please try again later.", 500));
  }

  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
  } catch (err) {
    return next(error("Couldn't create user! Please try again later.", 500));
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token });
}

async function login(req, res, next) {
  const { email, password } = req.body;
  let existingUser,
    token,
    passwordsMatch = false;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(error("Couldn't query database!", 500));
  }

  if (!existingUser) {
    return next(error("Username or password is incorrect!", 403));
  }

  try {
    passwordsMatch = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(error("Couldn't log in! Please try again later.", 500));
  }

  if (!passwordsMatch) {
    return next(error("Username or password is incorrect!", 403));
  }

  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
  } catch (err) {
    return next(error("Couldn't login! Please try again later.", 500));
  }

  res.status(200).json({
    message: "Logged user in!",
    userId: existingUser.id,
    email: existingUser.email,
    token,
  });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
