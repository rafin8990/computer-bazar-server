const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nuouh7o.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log(" successfully connected to MongoDB!");
    const categoryCollection = client
      .db("computer-maker")
      .collection("categories");
    const productsCollection = client
      .db("computer-maker")
      .collection("products");
    const featureProductsCollection = client
      .db("computer-maker")
      .collection("feature-products");

    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.send(result);
    });
    app.get("/category", async (req, res) => {
      const name = req.query.categoryName;
      const query = { categoryName: name };
      const result = await productsCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/categories", async (req, res) => {
      const query = {};
      const result = await categoryCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/allproduct", async (req, res) => {
      const query = {};
      const result = await productsCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/featureProducts", async (req, res) => {
      const query = {};
      const result = await featureProductsCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/feature/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await featureProductsCollection.findOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(" Computer Maker Server is running");
});

app.listen(port, () => {
  console.log(`Computer maker server is running on port ${port}`);
});
