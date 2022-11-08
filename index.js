const express = require('express');
const cors = require('cors');
const app = express()
require("dotenv").config();


const port = process.env.PORT || 5000;


// Middle ware
app.use(express.json());
app.use(cors())

app.get("/", function (req, res) {
    res.send("justica Server Running");
});
  
app.listen(port, () =>
  console.log("Justica Server up and Running on port",port)
);