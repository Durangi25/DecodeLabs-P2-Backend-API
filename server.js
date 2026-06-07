const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "Complete Project 2",
    description: "Build backend API",
    status: "pending"
  }
];

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Student Task API is running successfully"
  });
});

app.get("/tasks", (req, res) => {
  res.status(200).json({
    success: true,
    data: tasks
  });
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  res.status(200).json({
    success: true,
    data: task
  });
});

app.post("/tasks", (req, res) => {
  const { title, description, status } = req.body || {};

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title and description are required"
    });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    status: status || "pending"
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: newTask
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});