import { tasksLocalData } from "../../../data/localData/taskData";
import { Task } from "../../domain/interfaces";
import { TaskRepository } from "../../domain/repository/taskRepository";

export class LocalDataRepository implements TaskRepository {
  async getTasks(): Promise<Task[]> {
    return tasksLocalData;
  }
  async getTaskById(taskId: number): Promise<Task[] > {
    return tasksLocalData.filter((task) => task.idTask === taskId);
  }
  async createTask(task: Task): Promise<Task> {
    tasksLocalData.push(task);
    return task;
  }
  async deleteTask(taskId: number): Promise<Task[]> {
    return tasksLocalData.filter((task) => task.idTask !== taskId);
  }
  async updateTask(idTask: number, task: Task): Promise<void> {
    tasksLocalData.map((taskMap) => {
      if (taskMap.idTask === idTask) {
        taskMap.description = task.description;
        taskMap.title = task.title;
      }
    });
    return;
  }
}
