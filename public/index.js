var express = require("express");
var app = express();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
var port = process.env.PORT || 3000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get("/thumbnail", function (req, res) {
  res.sendFile(__dirname + "/images/thumbnail/thumbnail.png");
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});