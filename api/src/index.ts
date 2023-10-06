import express from "express";
import cors from "cors";
import loggerMiddleware from "./middleware/logger";
const app = express();
app.use(cors());
const port = process.env.PORT || 8000;
app.use(loggerMiddleware);

app.get("/api/ping", (req, res) => res.send("Pong"));

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
