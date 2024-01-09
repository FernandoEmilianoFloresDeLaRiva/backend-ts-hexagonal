import mysql, { ConnectionOptions, Connection } from "mysql2";
import { mySqlConnectionRepository } from "../domain/repository/mySqlConnectionRepository";
import dotenv from "dotenv";

dotenv.config();

const configConnection: ConnectionOptions = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

export class MySQLConnection implements mySqlConnectionRepository {
  private connection: Connection;

  constructor() {
    this.connection = mysql.createConnection(configConnection);
  }

  async connect(): Promise<void> {
    try {
      await this.connection.connect();
      console.log("Connected to database.");
    } catch (err) {
      console.error("Error connecting to database : " + err);
      throw new Error("Error connecting to database : " + err);
    }
  }

  async execute(query: string, values?: any[]): Promise<any> {
    return this.connection.execute(query, values);
  }
}
