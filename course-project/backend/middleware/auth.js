const jwt = require("jsonwebtoken");
require("dotenv").config();

const error = require("../models/http-error");

function isAuth(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: "Bearer TOKEN"

    if (!token) {
      throw new Error();
    }

    req.user = jwt.verify(token, process.env.JWT_KEY);

    next();
  } catch (err) {
    return next(error("Authentication failed!", 403));
  }
}

module.exports = isAuth;
