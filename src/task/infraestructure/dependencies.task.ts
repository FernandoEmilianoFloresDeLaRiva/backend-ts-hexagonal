import { tasksLocalData } from "../../shared/domain/jsonData/taskData.json";

import { LocalDataRepository } from "./DbRepository/localData.repository";
import { MySQLRepositoryTask } from "./DbRepository/mysql.repository";

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
import { JwtMiddleware } from "../../auth/application/middlewares";
import { JwtPort } from "../../auth/infraestructure/ports";

//Se inyecta dependencia (base de datos)
const localDataRepository = new LocalDataRepository(tasksLocalData);
const mysqlRepository = new MySQLRepositoryTask();

//Se inyecta servicio jwt
const jwtPort = new JwtPort();

//se inyecta la base de datos a los servicios
const getTasksService = new GetTasksService(mysqlRepository);
const getTaskByIdService = new GetTaskByIdService(mysqlRepository);
const createTaskService = new CreateTaskService(mysqlRepository);
const deleteteTaskService = new DeleteTaskService(localDataRepository);
const putTaskService = new PutTaskService(localDataRepository);

//se inyecta jwtMiddleware
export const jwtMiddleware = new JwtMiddleware(jwtPort);

//controlla a traves del servicio dado
export const getTasksController = new GetTasksController(getTasksService);
export const getTaskByIdController = new GetTaskByIdController(
  getTaskByIdService
);
export const createTaskController = new CreateTaskController(createTaskService);
export const deleteTaskController = new DeleteTaskController(
  deleteteTaskService
);
export const putTaskController = new PutTaskController(putTaskService);
