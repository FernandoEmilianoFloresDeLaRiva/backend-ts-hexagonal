import express from "express";
import indexRouter from "./index.router";

const app = express();
const PORT = "3000";

app.use(express.json());

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
