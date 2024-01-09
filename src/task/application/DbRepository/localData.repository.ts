import { Task } from "../../domain/entities";
import { TaskRepository } from "../../domain/repository/taskRepository";

export class LocalDataRepository implements TaskRepository {
  private tasksLocalData: Task[];
  constructor(tasksLocalData: Task[]) {
    this.tasksLocalData = tasksLocalData;
  }
  async getTasks(): Promise<Task[]> {
    return this.tasksLocalData;
  }
  async getTaskById(taskId: number): Promise<Task> {
    return this.tasksLocalData.filter((task) => task.idTask === taskId)[0];
  }
  async createTask(task: Task): Promise<Task> {
    const idTask = this.tasksLocalData.length;
    const newTask = {
      ...task,
      idTask,
    };
    this.tasksLocalData.push(newTask);
    return task;
  }
  async deleteTask(taskId: number): Promise<void> {
    this.tasksLocalData.filter((task) => task.idTask !== taskId);
    return;
  }
  async updateTask(idTask: number, task: Task): Promise<Task> {
    this.tasksLocalData.map((taskMap) => {
      if (taskMap.idTask === idTask) {
        taskMap.description = task.description;
        taskMap.title = task.title;
      }
    });
    return task;
  }
}
