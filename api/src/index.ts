import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 8000;

app.get("/ping", (req, res) => res.send("Pong"));

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
