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
import { BcryptService, JwtService } from "../../auth/infraestructure/ports";

const mysqlRepository = new MySqlRepositoryUser();
const jwtService = new JwtService();
const bcryptService = new BcryptService();

const deleteUserByEmailService = new DeleteUserByEmailService(mysqlRepository);
const getAllUsersService = new GetAllUsersService(mysqlRepository);
const getUserByEmailService = new GetUserByEmailService(mysqlRepository);
const updateUserByEmailService = new UpdateUserByEmailService(
  mysqlRepository,
  bcryptService
);
const getByIdService = new GetByIdService(mysqlRepository);

export const jwtMiddleware = new JwtMiddleware(jwtService);

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
