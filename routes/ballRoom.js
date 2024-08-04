const express = require("express");
const router = express.Router();
const controller = require("../controllers/basketballController");

const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};
router.use(timeLog);

router.route("/").get(controller.get).post(controller.post);
router.route("/:id").put(controller.put).delete(controller.delete);

// router.get("/", controller.get);
// router.post("/", controller.post);
// router.put("/:id", controller.put);
// router.delete("/:id", controller.delete);

module.exports = router;
