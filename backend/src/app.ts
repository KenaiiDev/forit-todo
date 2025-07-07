import express from "express";
import cors from "cors";

import { taskRouter } from "@/routes/task.routes";
import { errorHandler } from "@/middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", taskRouter);
app.use("/test", (_req, res) => {
  const body = {
    message: "Server running",
  };
  res.json(body);
});

app.use(errorHandler);

export default app;
