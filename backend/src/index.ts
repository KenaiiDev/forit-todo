import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api", async (_, res) => {
  const body = {
    message: "Server running",
  };
  res.json(body);
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
