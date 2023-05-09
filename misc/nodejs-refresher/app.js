const http = require("http");

const server = http.createServer((req, res) => {
  console.log(`Incoming request of type ${req.method} from ${req.url}`);

  if (req.method === "POST") {
    let body = "";

    req.on("end", () => {
      const username = body.split("=")[1];

      res.end(`<h1>${username}</h1>`);
    });
    req.on("data", (chunk) => (body += chunk));
  } else {
    res.setHeader("Content-Type", "text/html");
    res.end(
      '<form method="POST"><input type="text" name="username"><button type="submit">Create user</button></form>'
    );
  }
});

server.listen(5000);
