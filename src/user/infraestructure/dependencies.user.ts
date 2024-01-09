import { MySQLConnection } from "../../shared/mySql/application/mysqlConnection";
import { MySqlRepositoryUser } from "../application/DbRepository/mysql.repository";
import {
  DeleteUserByIdService,
  GetAllUsersService,
  GetUserByIdService,
  UpdateUserByIdService,
} from "../application/services";
import {
  DeleteUserByIdController,
  GetAllUsersController,
  GetUserByIdController,
  UpdateUserByIdController,
} from "./controllers";

const dbConnection = new MySQLConnection();

const mysqlRepository = new MySqlRepositoryUser(dbConnection);

const deleteUserByIdService = new DeleteUserByIdService(mysqlRepository);
const getAllUsersService = new GetAllUsersService(mysqlRepository);
const getUserByIdService = new GetUserByIdService(mysqlRepository);
const updateUserByIdService = new UpdateUserByIdService(mysqlRepository);

export const deleteUserByIdController = new DeleteUserByIdController(
  deleteUserByIdService
);
export const getAllUsersController = new GetAllUsersController(
  getAllUsersService
);
export const getUserByIdController = new GetUserByIdController(
  getUserByIdService
);
export const updateUserByIdController = new UpdateUserByIdController(
  updateUserByIdService
);
