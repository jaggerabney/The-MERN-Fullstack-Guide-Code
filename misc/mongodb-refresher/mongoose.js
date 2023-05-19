const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/product");

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log("Connected to DB!"))
  .catch(() => console.log("Connection failed!"));

async function createProduct(req, res, next) {
  const { name, price } = req.body;

  const createdProduct = new Product({ name, price });
  const result = await createdProduct.save();

  res.status(200).json(result);
}

async function getProducts(req, res, next) {
  const products = await Product.find().exec();

  res.status(200).json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;
