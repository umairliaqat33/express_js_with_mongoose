import express from "express";
import mongoose from "mongoose";
import User from "./models/user_model.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});
app.get("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const users = await User.findById(id);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = req.body;
    console.log(id + "   " + updatedUser);

    const user = await User.findByIdAndUpdate(id, updatedUser);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userAfterUpdate = await User.findById(id);

    res.status(200).json(userAfterUpdate);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:Winter15%2A%23@cluster0.8jwhyom.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connection successful");

    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
