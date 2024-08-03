const pool = require("../db");

module.exports = {
  get: async (req, res) => {
    try {
      const ballDetails = await pool.query("SELECT * FROM basketballs");
      res.status(200).json(ballDetails.rows);
    } catch (err) {
      res.status(err.statusCode).send(err.message);
    }
  },
  post: async (req, res) => {
    try {
      const { brand, model, size } = req.body;
      const newBall = await pool.query(
        "INSERT INTO basketballs (brand, model, size) VALUES ($1, $2, $3) RETURNING *",
        [brand, model, size]
      );
      res.status(201).json(newBall.rows[0]);
    } catch (err) {
      res.status(err.statusCode).send(err.message);
    }
  },
  put: async (req, res) => {
    try {
      const ballId = req.params.id;
      const { size } = req.body;
      const updatedBall = await pool.query(
        "UPDATE basketballs SET size = $1 WHERE id = $2 RETURNING *",
        [size, ballId]
      );
      if (updatedBall.rows.length === 0) {
        return res.status(404).send("Item Not Found");
      }
      res.status(200).json(updatedBall.rows[0]);
    } catch (err) {
      res.status(err.statusCode).send(err.message);
    }
  },
  delete: async (req, res) => {
    try {
      const ballId = req.params.id;
      const deletedBall = await pool.query(
        "DELETE FROM basketballs WHERE id = $1 RETURNING *",
        [ballId]
      );
      if (deletedBall.rows.length === 0) {
        return res.status(404).send("Item Not Found");
      }
      res.status(200).send("DELETED");
    } catch (err) {
      res.status(err.statusCode).send(err.message);
    }
  },
};
