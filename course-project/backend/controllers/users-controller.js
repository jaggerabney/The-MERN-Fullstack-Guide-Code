const { validationResult } = require("express-validator");

const { error } = require("../models/http-error");
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

  const { name, email, password, image } = req.body;
  let existingUser;

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

  const createdUser = new User({
    name,
    email,
    password,
    image,
    places: []
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
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(error("Couldn't query database!", 500));
  }

  if (!existingUser || existingUser.password !== password) {
    return next(error(("Username or password is incorrect!", 500)));
  }

  res.status(200).json({ message: "Logged user in!" });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
