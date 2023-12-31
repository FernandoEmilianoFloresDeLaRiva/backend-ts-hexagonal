import { MySQLConnection } from "../../shared/mySql/application/mysqlConnection";
import { tasksLocalData } from "../../localData/taskData";

import { LocalDataRepository } from "../application/DbRepository/localData.repository";
import { MySQLRepository } from "../application/DbRepository/mysql.repository";

import {
  GetTasksService,
  GetTaskByIdService,
  CreateTaskService,
  DeleteTaskService,
  PutTaskService,
} from "../application/services";
import {
  CreateTaskController,
  DeleteTaskController,
  GetTaskByIdController,
  GetTasksController,
  PutTaskController,
} from "./controllers";

//Se inicializa db
const dbConnection = new MySQLConnection();

//Se inyecta dependencia (base de datos)
const localDataRepository = new LocalDataRepository(tasksLocalData);
const mysqlRepository = new MySQLRepository(dbConnection);

//se inyecta la base de datos a los servicios
const getTasksService = new GetTasksService(mysqlRepository);
const getTaskByIdService = new GetTaskByIdService(mysqlRepository);
const createTaskService = new CreateTaskService(mysqlRepository);
const deleteteTaskService = new DeleteTaskService(localDataRepository);
const putTaskService = new PutTaskService(localDataRepository);

//controlla a traves del servicio dado
export const getTasksController = new GetTasksController(getTasksService);
export const getTaskByIdController = new GetTaskByIdController(
  getTaskByIdService
);
export const createTaskController = new CreateTaskController(createTaskService);
export const deleteTaskController = new DeleteTaskController(
  deleteteTaskService
);
export const putTaskController = new PutTaskController(putTaskService)