const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  if (req.body) {
    return res.send(`<h1>User: ${req.body.name}</h1>`);
  }

  res.send(
    '<form method="POST"><input type="text" name="username"><button type="submit">Create user</buton></form>'
  );
});

app.listen(5000);
