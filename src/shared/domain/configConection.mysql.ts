import { ConnectionOptions } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const configConnection: ConnectionOptions = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};
