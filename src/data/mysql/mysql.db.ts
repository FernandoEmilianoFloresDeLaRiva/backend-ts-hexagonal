import mysql, { ConnectionOptions } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const configConnection: ConnectionOptions = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const db = mysql.createConnection(configConnection);

const dbPromise = db.promise();

dbPromise
  .connect()
  .then(() => console.log("Connected to database."))
  .catch((err) => console.error("Error conectando base de datos: ", err));

export default dbPromise;
