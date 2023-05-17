function getUsers(req, res, next) {
  res.status(200).json({ users: dummyUsers });
}

exports.getUsers = getUsers;
