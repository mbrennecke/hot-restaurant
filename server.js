var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

var tables = [];

var waitList = {};

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservation", function(req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

// Displays all reserved tables in json
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all waitlist in json
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

// Reserve Table - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newtable = req.body;

  tables.push(newtable);

  res.json(newtable);
});

// Starts the server to begin listening
// ========================================

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});