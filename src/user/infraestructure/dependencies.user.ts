import { MySqlRepositoryUser } from "../application/DbRepository/mysql.repository";
import {
  DeleteUserByEmailService,
  GetAllUsersService,
  GetUserByEmailService,
  UpdateUserByEmailService,
} from "../application/services";
import {
  DeleteUserByEmailController,
  GetAllUsersController,
  GetUserByEmailController,
  UpdateUserByEmailController,
} from "./controllers";

const mysqlRepository = new MySqlRepositoryUser();

const deleteUserByEmailService = new DeleteUserByEmailService(mysqlRepository);
const getAllUsersService = new GetAllUsersService(mysqlRepository);
const getUserByEmailService = new GetUserByEmailService(mysqlRepository);
const updateUserByEmailService = new UpdateUserByEmailService(mysqlRepository);

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
