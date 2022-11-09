const express = require('express');
const cors = require('cors');
const app = express()
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');



const port = process.env.PORT || 5000;


// Middle ware
app.use(express.json());
app.use(cors())

app.get("/", function (req, res) {
    res.send("justica Server Running");
});


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ia0tdiq.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



  
app.listen(port, () =>
  console.log("Justica Server up and Running on port",port)
);