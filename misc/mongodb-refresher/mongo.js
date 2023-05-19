const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

async function createProduct(req, res, next) {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };

  console.log(process.env.DB_CONNECTION_STRING);

  const client = new MongoClient(process.env.DB_CONNECTION_STRING);

  try {
    await client.connect();
    const db = client.db();

    const result = await db.collection("products").insertOne(newProduct);
  } catch (error) {
    return res.json({ message: "Couldn't create product!" });
  }

  client.close();

  res.status(201).json({ product: newProduct });
}

async function getProducts(req, res, next) {}

exports.createProduct = createProduct;
exports.getProducts = getProducts;
