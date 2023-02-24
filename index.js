const express = require("express");
const http = require("http");
const cors = require("cors");
const { initDB } = require("./db");
const ToDo = require("./db/models/ToDo.model");

const app = express();
const PORT = 3100;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, _, next) => {
  console.log("URL = ", req.url);
  console.log("METHOD = ", req.method);
  console.log("HOST = ", req.headers.host);
  console.log("BODY = ", req.body);
  console.log("QUERY = ", req.query);

  next();
});

// app.all('/test', (req, res) => {
//     res.status(200).json({message: 'im working'});
// });

// получение все ToDo
app.get("/todos", async (req, res) => {
  try {
    const todoList = await ToDo.findAll();
    res.status(200).json({ todoList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//получение ToDo по id
app.get("/todos/:id", async (req, res) => {
  try {
    const todoById = await ToDo.findByPk(req.params.id);
    if (todoById === null) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json({ todoById });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// создание ToDo
app.post("/todos", async (req, res) => {
  try {
    const todo = await ToDo.create({
      title: req.body.title,
      description: req.body.description,
      isDone: req.body.isDone,
    });
    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// редактирование ToDo по id
app.patch("/todos/:id", async (req, res) => {
  try {
    const updateByUser = await ToDo.findByPk(req.params.id);
    if (updateByUser === null) {
      res.status(404).json({ message: "Not found" });
    } else {
      await updateByUser.update(
        {
          title: req.body.title,
          description: req.body.description,
          isDone: req.body.isDone,
        },
        {
          where: { id: req.params.id },
        }
      );
      const updateTodo = await ToDo.findByPk(req.params.id);
      res.status(200).json({ updateTodo });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// удаление ToDo по id
app.delete("/todos/:id", async (req, res) => {
  try {
    const deleteById = await ToDo.findByPk(req.params.id);
    if (deleteById === null) {
      res.status(404).json({ message: "Not found" });
    } else {
      await deleteById.destroy();
      res.status(200).json({ message: "ToDo was deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// удаление всех ToDo
app.delete("/todos", async (req, res) => {
  try {
    await ToDo.destroy({
      where: {},
    });
    res.status(200).json({ message: "All ToDos were deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

http.createServer(app).listen(PORT, () => {
  console.log(`Server is working on port ${PORT}`);
});

initDB();
