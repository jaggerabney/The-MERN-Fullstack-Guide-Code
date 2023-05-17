const express = require("express");

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

router.get("/", (req, res, next) => {
  res.status(200).json({ users: dummyUsers });
});

module.exports = router;
