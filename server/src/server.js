const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
app.use(express.json()); //req body te data receive korte pari
app.use(express.urlencoded({ extended: true })); // req body te for, niye kaj kora jabe

const isLoggedIn = (req, res, next) => {
  //   console.log("isLogged in middle ware");
  const login = true;
  if (login) {
    if (!req.body) {
      req.body = {}; // Initialize req.body if it's not defined
    }
    req.body.id = 101;
    next();
  } else {
    return res.status(401).json({ message: "unauthorized" });
  }
};
// app.use(isLoggedIn)

app.get("/test", (req, res) => {
  // console.log(object)
  res.status(200).send({
    message: " Welcome to the server",
  });
});
app.get("/api/user", isLoggedIn, (req, res) => {
  console.log(req.body.id);
  res.status(200).send({
    message: "user profile is returned",
  });
});

app.listen(3000, () => {
  console.log(`server is running at port 3000`);
});
