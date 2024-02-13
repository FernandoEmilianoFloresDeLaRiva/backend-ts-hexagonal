import { createConnection } from "mysql2";
import { configConnection } from "../domain/mysql/configConection.mysql";;
import { Connection } from "mysql2/typings/mysql/lib/Connection";

const dbConnection: Connection = createConnection(configConnection);
export const db = dbConnection.promise();
