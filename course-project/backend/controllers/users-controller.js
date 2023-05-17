const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let dummyUsers = [
  {
    name: "Jagger",
    email: "test@test.com",
    password: "password",
    loggedIn: false,
  },
  {
    name: "Kira",
    email: "test2@test.com",
    password: "password2",
    loggedIn: false,
  },
];

function getUsers(req, res, next) {
  res.status(200).json({ users: dummyUsers });
}

function signup(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);

    throw new HttpError("Invalid information!", 422);
  }

  const { name, email, password } = req.body;
  const userAlreadyExists = dummyUsers.find((user) => user.email == email);

  if (userAlreadyExists) {
    throw new HttpError(
      "The provided email address already belongs to an account.",
      422
    );
  }

  const newUser = {
    id: uuid(),
    name,
    email,
    password,
    loggedIn: false,
  };

  dummyUsers.push(newUser);

  res.status(201).json({ user: newUser });
}

function login(req, res, next) {
  const { email, password } = req.body;
  const targetUser = {
    ...dummyUsers.find((user) => user.email === email),
  };

  if (!targetUser || targetUser.password !== password) {
    throw new HttpError("Invalid email or password!", 401);
  }

  res.status(200).json({ message: "Logged user in!" });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
