import { MySqlRepositoryUser } from "../../user/infraestructure/DbRepository/mysql.repository";
import { LoginAuthService, RegisterAuthService } from "../application/services";
import { LoginAuthController } from "./controllers/loginAuth.controller";
import { RegisterAuthController } from "./controllers/registerAuth.controller";

const mysqlRepository = new MySqlRepositoryUser();

const loginAuthService = new LoginAuthService(mysqlRepository);
const registerAuthService = new RegisterAuthService(mysqlRepository);

export const loginAuthController = new LoginAuthController(loginAuthService);
export const registerAuthController = new RegisterAuthController(
  registerAuthService
);
