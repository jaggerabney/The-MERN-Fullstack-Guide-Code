const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const error = require("../models/http-error");
const User = require("../models/user");

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
  let existingUser, hashedPassword;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(error("Couldn't query the database for the given email!", 500));
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
    return next(error("Couldn't save user to database!", 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
}

async function login(req, res, next) {
  const { email, password } = req.body;
  let existingUser,
    passwordsMatch = false;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(error("Couldn't query database!", 500));
  }

  if (!existingUser) {
    return next(error("Username or password is incorrect!", 401));
  }

  try {
    passwordsMatch = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(error("Couldn't log in! Please try again later.", 500));
  }

  if (!passwordsMatch) {
    return next(error("Username or password is incorrect!", 401));
  }

  res.status(200).json({
    message: "Logged user in!",
    user: existingUser.toObject({ getters: true }),
  });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
