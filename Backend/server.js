const app = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//connect to mongoDB
mongoose.connect("mongodb://localhost/mern-stack-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// define routes and middleware

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

const todoSchema = new mongoose.Schema({
  task: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

// Add this to server.js
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});
