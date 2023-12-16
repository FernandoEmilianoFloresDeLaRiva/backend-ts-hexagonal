import { Task } from "../interfaces";

export interface TaskRepository {
  getTasks(): Promise<Task[]>;
  getTaskById(taskId: number): Promise<Task []>;
  createTask(task: Task): Promise<Task>;
  deleteTask(taskId: number): Promise<Task[]>;
  updateTask(idTask: number, task: Task): Promise<void>;
}
