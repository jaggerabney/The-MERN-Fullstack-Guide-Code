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
  const { name, email, password } = req.body;
  const newUser = { name, email, password, loggedIn: false };

  dummyUsers.push(newUser);

  res.status(201).json({ user: newUser });
}

function login(req, res, next) {
  const { email, password } = req.body;
  const targetUserIndex = dummyUsers.findIndex(
    (user) => user.email === email && user.password === password
  );

  const targetUser = { ...dummyUsers[targetUserIndex] };
  targetUser.loggedIn = true;

  dummyUsers[targetUserIndex] = targetUser;

  res.status(200).json({ user: targetUser });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
