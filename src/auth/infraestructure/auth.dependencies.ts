import { MySQLConnection } from "../../shared/mySql/application/mysqlConnection";
import { MySqlRepositoryUser } from "../../user/application/DbRepository/mysql.repository";
import { LoginAuthService, RegisterAuthService } from "../application/services";
import { LoginAuthController } from "./controllers/loginAuth.controller";
import { RegisterAuthController } from "./controllers/registerAuth.controller";

const dbConnection = new MySQLConnection();

const mysqlRepository = new MySqlRepositoryUser(dbConnection);

const loginAuthService = new LoginAuthService(mysqlRepository);
const registerAuthService = new RegisterAuthService(mysqlRepository)

export const loginAuthController = new LoginAuthController(loginAuthService)
export const registerAuthController = new RegisterAuthController(registerAuthService)