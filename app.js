const express = require("express");
const data = require("./data.json");
const { projects } = data;

const app = express();

app.listen(process.env.PORT || 3000, () => {
  console.log("The application is running on localhost:3000!");
});

// View engine setup
app.set("view engine", "pug");

// Add static middleware
app.use("/static", express.static("public"));

// Add routes
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
  const err = new Error("404 Not Found");
  err.status = 404;
  next(err);
});

//404 error handler
app.use((req, res, next) => {
  res.render("page-not-found", { err });
});

//global error handler
app.use((err, req, res, next) => {
  if (err) {
    console.log("Globarl error handler called", err.message, err.status);
  }
  if (err.status === 404) {
    res.status(err.status);
    res.render("page-not-found", { err });
  } else {
    err.message = err.message;
    res.status = err.status;
    res.render("error", { err });
  }
});
