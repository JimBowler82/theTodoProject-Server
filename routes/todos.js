const router = require("express").Router();
const { authoriseUser } = require("../util/authorise");

router.use(authoriseUser);

router.get("/", (req, res) => {
  console.log("Get all todos received");
  res.send("all the todos");
});

router.post("/", (req, res) => {
  console.log("Post - new todo to add");
  res.send("adding a new todo");
});

router.patch("/:id", (req, res) => {
  console.log("update todo received");
  res.send("Updating a todo");
});

router.delete("/:id", (req, res) => {
  console.log("delete todo received");
  res.send("Deleting a todo");
});

module.exports = router;
