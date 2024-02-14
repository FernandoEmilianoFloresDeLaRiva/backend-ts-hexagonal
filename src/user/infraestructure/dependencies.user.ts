import { MySqlRepositoryUser } from "./DbRepository/mysql.repository";
import {
  DeleteUserByEmailService,
  GetAllUsersService,
  GetUserByEmailService,
  UpdateUserByEmailService,
  GetByIdService,
} from "../application/services";
import {
  DeleteUserByEmailController,
  GetAllUsersController,
  GetByIdController,
  GetUserByEmailController,
  UpdateUserByEmailController,
} from "./controllers";
import { JwtMiddleware } from "../../auth/application/middlewares";
import { BcryptPort, JwtPort } from "../../auth/infraestructure/ports";
import { CreatePasswordService } from "../../auth/application/services";
import { AmqpLibPort } from "../../shared/infraestructure/ports/AmqpLib";
import {
  ConsumeChannelService,
  SendMessageService,
} from "../../shared/application/broker/services";

const mysqlRepository = new MySqlRepositoryUser();
const jwtPort = new JwtPort();
const bcryptService = new BcryptPort();
const amqpLibPort = new AmqpLibPort("amqp://localhost");

const consumeChannelService = new ConsumeChannelService(amqpLibPort);
const sendMessageService = new SendMessageService(amqpLibPort);
const createPasswordService = new CreatePasswordService(
  bcryptService,
  consumeChannelService,
  sendMessageService
);

const deleteUserByEmailService = new DeleteUserByEmailService(mysqlRepository);
const getAllUsersService = new GetAllUsersService(mysqlRepository);
const getUserByEmailService = new GetUserByEmailService(mysqlRepository);
const updateUserByEmailService = new UpdateUserByEmailService(
  mysqlRepository,
  sendMessageService,
  consumeChannelService
);
const getByIdService = new GetByIdService(mysqlRepository);

export const jwtMiddleware = new JwtMiddleware(jwtPort);

export const deleteUserByEmailController = new DeleteUserByEmailController(
  deleteUserByEmailService
);
export const getAllUsersController = new GetAllUsersController(
  getAllUsersService
);
export const getUserByEmailController = new GetUserByEmailController(
  getUserByEmailService
);
export const updateUserByEmailController = new UpdateUserByEmailController(
  updateUserByEmailService
);
export const getByIdController = new GetByIdController(getByIdService);
