const jwt = require("jsonwebtoken");
require("dotenv").config();

const error = require("../models/http-error");

function isAuth(req, res, next) {
  try {
    const token = req.headers.authoriztion.split(" ")[1]; // Authorization: "Bearer TOKEN"

    if (!token) {
      throw new Error();
    }

    req.userId = jwt.verify(token, process.env.JWT_KEY);

    next();
  } catch (err) {
    return next(error("Authentication failed!", 401));
  }
}

module.exports = isAuth;
