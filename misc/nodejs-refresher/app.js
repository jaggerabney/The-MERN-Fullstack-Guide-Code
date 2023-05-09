const http = require("http");

const server = http.createServer((req, res) => {
  console.log(`Incoming request of type ${req.method} from ${req.url}`);

  res.end("<h1>Success!</h1>");
});

server.listen(5000);
