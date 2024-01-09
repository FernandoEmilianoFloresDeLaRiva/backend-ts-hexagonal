import { Task } from "../entities";

export interface TaskRepository {
  getTasks(): Promise<Task[]>;
  getTaskById(taskId: number): Promise<Task>;
  createTask(task: Task): Promise<Task>;
  deleteTask(taskId: number): Promise<void>;
  updateTask(idTask: number, task: Task): Promise<Task>;
}
