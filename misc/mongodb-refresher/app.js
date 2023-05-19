const express = require("express");
const bodyParser = require("body-parser");

const mongoPractice = require("./mongoose");

const app = express();

app.use(bodyParser.json());

app.post("/products", mongoPractice.createProduct);
// app.get("/products", mongoPractice.getProducts);

app.listen(3000);
