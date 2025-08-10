const express = require("express");
const morgan = require("morgan");
const app = express();
const createError = require("http-errors");

app.use(morgan("dev"));
app.use(express.json()); //req body te data receive korte pari
app.use(express.urlencoded({ extended: true })); // req body te for, niye kaj kora jabe

// const isLoggedIn = (req, res, next) => {
//   //   console.log("isLogged in middle ware");
//   const login = true;
//   if (login) {
//     if (!req.body) {
//       req.body = {}; // Initialize req.body if it's not defined
//     }
//     req.body.id = 101;
//     next();
//   } else {
//     return res.status(401).json({ message: "unauthorized" });
//   }
// };
// app.use(isLoggedIn)

app.get("/test", (req, res) => {
  // console.log(object)
  res.status(200).send({
    message: " Welcome to the server",
  });
});
app.get("/api/users", (req, res) => {
  console.log(req.body.id);
  res.status(200).send({
    message: "user profile is returned",
  });
});
//client  error
app.use((req, res, next) => {
  // res.status(404).json({ message: "route not found" })

  next(createError(404, "Route not found"));
});
//server error.....all errors
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
