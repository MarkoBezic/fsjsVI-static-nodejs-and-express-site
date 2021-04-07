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
  res.render("index", { projects });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/projects/:id", (req, res) => {
  const projectId = req.params.id;
  const project = projects.find(({ id }) => id === +projectId);
  res.render("project", { project });
});

//catch 404 error forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//error handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error");
});

//global error handler
app.use((err, req, res, next) => {
  if (err) {
    console.log("Globarl error handler called", err.message, err.status);
  }
  res.locals.error = err;
  res.status(err.status);
  res.render("error");
});
