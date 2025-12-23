import Todo from "../model/todo.model.js";

// Creating Todo Func
export const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    user: req.user._id,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "Todo created successfully", newTodo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error occured during todo creation" });
  }
};

// Fetching Todo func

export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(201).json({ message: "Todo fetched successfully", todos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error occured during todo fetching" });
  }
};

// Updating todo

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error occured during todo updating" });
  }
};

// deleting todo

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(201).json({ message: "Todo delete successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error occured during todo deleting" });
  }
};
