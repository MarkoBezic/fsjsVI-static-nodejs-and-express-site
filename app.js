const express = require("express");
const data = require("./data.json");

const app = express();

app.listen(3000, () => {
  console.log("The application is running on localhost:3000!");
});

app.set("view engine", "pug");

//TODO: review serving static files in express
app.use(express.static("/public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/projects/:id", (req, res) => {});
