import { Task } from "../../domain/interfaces";
import { TaskRepository } from "../../domain/repository/taskRepository";

export class LocalDataRepository implements TaskRepository {
  private tasksLocalData : Task[];
  constructor(tasksLocalData : Task[]){
    this.tasksLocalData = tasksLocalData;
  }
  async getTasks(): Promise<Task[]> {
    return this.tasksLocalData;
  }
  async getTaskById(taskId: number): Promise<Task[] > {
    return this.tasksLocalData.filter((task) => task.idTask === taskId);
  }
  async createTask(task: Task): Promise<Task> {
    this.tasksLocalData.push(task);
    return task;
  }
  async deleteTask(taskId: number): Promise<Task[]> {
    return this.tasksLocalData.filter((task) => task.idTask !== taskId);
  }
  async updateTask(idTask: number, task: Task): Promise<void> {
    this.tasksLocalData.map((taskMap) => {
      if (taskMap.idTask === idTask) {
        taskMap.description = task.description;
        taskMap.title = task.title;
      }
    });
    return;
  }
}
