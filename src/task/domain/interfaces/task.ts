import { TaskResponse } from "./taskResponse";

export interface Task extends TaskResponse{
    idTask: number;
    idUser: number;
}