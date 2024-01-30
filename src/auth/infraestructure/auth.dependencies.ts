import { MySqlRepositoryUser } from "../../user/infraestructure/DbRepository/mysql.repository";
import { LoginAuthService, RegisterAuthService } from "../application/services";
import { LoginAuthController } from "./controllers/loginAuth.controller";
import { RegisterAuthController } from "./controllers/registerAuth.controller";
import { BcryptService, JwtService } from "./ports";

const mysqlRepository = new MySqlRepositoryUser();
const bcryptService = new BcryptService();
const jwtService = new JwtService();

const loginAuthService = new LoginAuthService(
  mysqlRepository,
  jwtService,
  bcryptService
);
const registerAuthService = new RegisterAuthService(
  mysqlRepository,
  jwtService,
  bcryptService
);

export const loginAuthController = new LoginAuthController(loginAuthService);
export const registerAuthController = new RegisterAuthController(
  registerAuthService
);
