import { TaskResponse } from "../../domain/interfaces";
import { TaskRepository } from "../../domain/repository/taskRepository";

export class DeleteTaskService {
  constructor(private taskRepository: TaskRepository) {}
  async run(taskId: number) : Promise<TaskResponse[] | string> {
    try {
      const findTask = await this.taskRepository.getTaskById(taskId);
      if (findTask) {
        const response = await this.taskRepository.deleteTask(taskId);
        return response;
      }
      return "Task not found";
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
