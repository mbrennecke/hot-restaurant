var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var tables = [];

var waitlist = [];

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/index", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservation", function(req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

// Displays tables page
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all tables in json
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays all waitlist in json
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

// Reserve Table - takes in JSON input
app.post("/api/reservations", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newtable = req.body;
  
  console.log(newtable);

  if (tables.length < 5){
	  tables.push(newtable);
  } else {
	  waitlist.push(newtable);
  }
  

  res.json(newtable);
});

// Starts the server to begin listening
// ========================================

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});