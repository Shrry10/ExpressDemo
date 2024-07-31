const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
