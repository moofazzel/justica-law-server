const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;

// Middle ware
app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("justica Server Running");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ia0tdiq.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function connectDb() {
  try {
    await client.connect();
    console.log("Database Connected");
  } catch (error) {
    console.log(error.name, error.massage, error.stack);
  }
}

connectDb();

const justicaDataCollections = client
  .db("jastica-db")
  .collection("justica-data");

// find all data
try {
  app.get("/data", async (req, res) => {
    const query = {};
    const cursor = justicaDataCollections.find(query);
    const data = await cursor.toArray();
    res.send(data);
    console.log(data);
  });
} catch (error) {
  console.log(error.name, error.massage, error.stack);
}
// find 3 data
try {
  app.get("/dataLimit", async (req, res) => {
    const query = {};
    const cursor = justicaDataCollections.find(query);
    const data = await cursor.limit(3).toArray();
    res.send(data);
    console.log(data);
  });
} catch (error) {
  console.log(error.name, error.massage, error.stack);
}
// find data with ID
try {
  app.get("/data/:id", async (req, res) => {
    const { id } = req.params;
    const query = { _id: ObjectId(id) };
    const data = await justicaDataCollections.findOne(query);
    res.send(data);
  });
} catch (error) {
  console.log(error.name, error.massage, error.stack);
}

// insert document
try {
  app.post("/service", async (req, res) => {
    const result = await justicaDataCollections.insertOne(req.body);
    res.send(result);
  });
} catch (error) {
  console.log(error.name, error.massage, error.stack);
}

app.listen(port, () =>
  console.log("Justica Server up and Running on port", port)
);
