const express = require("express");
const data = require("./data.json");
const { projects } = data;

const app = express();

app.listen(3000, () => {
  console.log("The application is running on localhost:3000!");
});

app.set("view engine", "pug");

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  const { projects } = req.query;
  console.log(projects);
  res.render("index", { projects });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/projects/:id", (req, res) => {});
