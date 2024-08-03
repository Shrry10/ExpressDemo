const express = require("express");
const controller = require("./controllers/basketballController");

const app = express();
app.use(express.json());

// const requestTime = (req, res, next) => {
//   req.requestTime = Date.now();
//   next();
// };

// app.use(requestTime);

// app.get("/", (req, res) => {
//   res.send(`Hello World! Requested at: ${req.requestTime}`);
// });

app.route("/basketball").get(controller.get).post(controller.post);
app.route("/basketball/:id").put(controller.put).delete(controller.delete);



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
