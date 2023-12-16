import { Task, TaskResponse } from "../../domain/interfaces";
import { TaskRepository } from "../../domain/repository/taskRepository";

export class CreateTaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
  async run(task: Task) : Promise<TaskResponse | string> {
    try {
      if (task.description && task.idTask && task.idUser && task.title) {
        const response = await this.taskRepository.createTask(task);
        return response;
      }
      return "Task creation failed";
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
