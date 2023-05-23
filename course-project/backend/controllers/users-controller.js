const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

async function getUsers(req, res, next) {
  let users;

  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError("Couldn't retrieve users!", 500);

    return next(error);
  }

  res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
}

async function signup(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid information!", 422);

    return next(error);
  }

  const { name, email, password, image, places } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      "Couldn't query database for the given email!",
      500
    );

    return next(error);
  }

  if (existingUser) {
    const error = HttpError(
      "The provided email already belongs to an account."
    );

    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
    image,
    places
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Couldn't save user to database!", 500);

    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
}

async function login(req, res, next) {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError("Couldn't query database!", 500);

    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("Username or password is incorrect!", 500);

    return next(error);
  }

  res.status(200).json({ message: "Logged user in!" });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
