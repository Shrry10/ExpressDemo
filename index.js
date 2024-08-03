const express = require("express");

const app = express();
app.use(express.json());

const requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get("/", (req, res) => {
  res.send(`Hello World! Requested at: ${req.requestTime}`);
});

app.get("/basketball", (req, res) => {
  res.status(200).send({
    brand: "SPALDING",
    size: "7",
  });
});

app.post("/basketball/:model", (req, res) => {
  const { model } = req.params;
  console.log(req.body);
  const { brand, size } = req.body;

  if (!brand || !size) {
    res.status(418).send({ message: "We need the brand and size" });
  }

  res.send({
    brand: `${brand} ${model}`,
    size: `${size}`,
  });
});

app.get(
  "/user/:id",
  (req, res, next) => {
    if (req.params.id === "0") next("route");
    else next();
  },
  (req, res, next) => {
    res.send("regular");
  }
);

app.get("/user/:id", (req, res, next) => {
  res.send("special");
});



// ----------error handling-------------

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).send(err.message);
});


// -------------------------------------



const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
