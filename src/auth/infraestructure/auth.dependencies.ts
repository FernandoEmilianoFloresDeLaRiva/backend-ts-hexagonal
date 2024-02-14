import {
  ConsumeChannelService,
  SendMessageService,
} from "../../shared/application/broker/services";
import { AmqpLibPort } from "../../shared/infraestructure/ports/AmqpLib";
import { MySqlRepositoryUser } from "../../user/infraestructure/DbRepository/mysql.repository";
import {
  CreateTokenService,
  LoginAuthService,
  RegisterAuthService,
  CompareCredentialsService,
  CreatePasswordService,
} from "../application/services";
import { LoginAuthController } from "./controllers/loginAuth.controller";
import { RegisterAuthController } from "./controllers/registerAuth.controller";
import { BcryptPort, JwtPort } from "./ports";

const mysqlRepository = new MySqlRepositoryUser();
const bcryptPort = new BcryptPort();
const jwtPort = new JwtPort();
const amqpLibPort = new AmqpLibPort("amqp://localhost");

const consumeChannelService = new ConsumeChannelService(amqpLibPort);
const sendMessageService = new SendMessageService(amqpLibPort);
const createPassword = new CreatePasswordService(
  bcryptPort,
  consumeChannelService,
  sendMessageService
);
const compareCredentials = new CompareCredentialsService(bcryptPort);
const createToken = new CreateTokenService(jwtPort);

const loginAuthService = new LoginAuthService(
  mysqlRepository,
  jwtPort,
  compareCredentials
);
const registerAuthService = new RegisterAuthService(
  mysqlRepository,
  createToken,
  createPassword,
  consumeChannelService,
  sendMessageService
);

export const loginAuthController = new LoginAuthController(loginAuthService);
export const registerAuthController = new RegisterAuthController(
  registerAuthService
);
