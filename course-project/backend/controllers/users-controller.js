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

function getUsers(req, res, next) {
  res.status(200).json({ users: dummyUsers });
}

function addUser(req, res, next) {
  const { name, email, password } = req.body;
  const newUser = { name, email, password };

  dummyUsers.push(newUser);

  res.status(201).json({ user: newUser });
}

exports.getUsers = getUsers;
exports.addUser = addUser;
