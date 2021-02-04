const router = require("express").Router();
const User = require("../model/User");
const mongoose = require("mongoose");
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
    const result = await User.findOneAndUpdate(
      { _id: req.userId },
      { $set: { todos: todoList } },
      { new: true, useFindAndModify: false }
    );

    console.log("Successfully added todo", result);
    res.status(200).json({
      success: true,
      message: "Todo list updated from add new todo",
      data: result.todos,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
});

router.patch("/:id", authoriseUser, async (req, res) => {
  try {
    const result = await User.updateOne(
      {
        _id: req.userId,
        "todos._id": req.params.id,
      },
      {
        $set: {
          "todos.$.content": req.body.data.content,
          "todos.$.completed": req.body.data.completed,
        },
      },
      { new: true, useFindAndModify: false }
    );
    console.log({ result });
    console.log("Successfully updated todo!");

    res.status(200).json({
      success: true,
      message: "Successfully updated todo!",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete("/:id", authoriseUser, async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.userId,
      { $pull: { todos: { _id: req.params.id } } },
      { new: true, useFindAndModify: false }
    );

    console.log("Successfully deleted todo!");
    res.status(200).json({
      success: true,
      message: "Successfully deleted todo!",
      data: result.todos,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
