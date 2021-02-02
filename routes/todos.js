const router = require("express").Router();
const User = require("../model/User");
const { authoriseUser } = require("../util/authorise");

router.get("/", authoriseUser, async (req, res) => {
  console.log("Get all todos received");
  try {
    const user = await User.findOne({ _id: req.userId });
    res.status(200).json({
      success: true,
      message: "Get all todo's success",
      data: user.todos,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
});

router.post("/", authoriseUser, async (req, res) => {
  const todoList = req.body.data;
  console.log(`Post received, add new todo`);
  try {
    const { err, doc } = await User.findOneAndUpdate(
      { id: req.params.userId },
      { $set: { todos: todoList } },
      { new: true, useFindAndModify: false }
    );
    if (err) {
      throw new Error(err);
    } else {
      console.log("Successfully added todo");
      res.status(200).json({
        success: true,
        message: "Todo list updated from add new todo",
        data: doc,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
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
