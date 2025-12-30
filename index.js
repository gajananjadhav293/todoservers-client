

import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());


let TODOS = [
  { todo: "wake up", description: "Get out of bed and start your day" },
  { todo: "running", description: "Go for a run to stay fit " },
  { todo: "bathing", description: "Take a refreshing bath " },
  { todo: "breakfast", description: "Eat a healthy breakfast" },
  { todo: "wake up", description: "Get out of bed and start your day" },
 

];


app.get("/", (req, res) => {
  res.json(TODOS);
});

app.post("/item", (req, res) => {
  const { todo, description } = req.body;

  if (!todo) {
    return res.status(400).json({ message: "Todo is required" });
  }

  const newItem = {
    todo,
    description: description || "description not provided"
  };

  TODOS.push(newItem);

  res.json({
    message: "Item added successfully",
    items: TODOS
  });
});



app.delete("/item/:index", (req, res) => {
  const index = req.params.index;
  
  if (index < 0 || index >= TODOS.length) {
    return res.status(404).json({ message: "Index not found" });
  }

  const deletedItem = TODOS.splice(index, 1);

  res.json({
    message: "Item deleted successfully",
    deletedItem,
    items: TODOS
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
