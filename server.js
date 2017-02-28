// includes/required
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");


// custom routers
var index = require("./routes/index");
var todos = require("./routes/todos");

var app=express();

// Views and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// static/client side files
app.use(express.static(path.join(__dirname, "client")));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// routes
app.use("/", index);
app.use("/api/v1", todos);

var port = process.env.PORT || 3000;

app.listen(port)
console.log("Server started on port " + port);

