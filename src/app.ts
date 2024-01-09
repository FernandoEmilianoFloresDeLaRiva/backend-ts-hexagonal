import express from "express";
import cors from "cors";
import indexRouter from "./index.router";
import { MySQLConnection } from "./shared/mySql/application/mysqlConnection";

const app = express();
const PORT = "3000";

app.use(cors());
app.use(express.json());

app.use("/", indexRouter);

const dbConnection = new MySQLConnection();
dbConnection.connect();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
