const express = require("express");

const usersController = require("../controllers/users-controller");

let dummyUsers = [
  {
    name: "Jagger",
    email: "test@test.com",
    password: "password",
  },
  {
    name: "Kira",
    email: "test2@test.com",
    password: "password2",
  },
];

const router = express.Router();

router.get("/", usersController.getUsers);

module.exports = router;
