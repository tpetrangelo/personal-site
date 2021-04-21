var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));


app.listen(port, () => {
    console.log("Server listening on port " + port);
});
