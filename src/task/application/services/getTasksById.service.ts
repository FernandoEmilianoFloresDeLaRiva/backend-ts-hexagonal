import { getTaskByIdDto } from "../../domain/dtos";
import { TaskRepository } from "../../domain/repository/taskRepository";
import { TaskResponse } from "../../domain/interfaces";

export class GetTaskByIdService {
  constructor(private readonly TaskRepository: TaskRepository) {}
  async run(taskId: number): Promise<TaskResponse | string> {
    try {
      const response = await this.TaskRepository.getTaskById(taskId);
      if (response.length !== 0) {
        console.log(response)
        const formatedResponse = getTaskByIdDto(response[0]);
        return formatedResponse;
      }
      return "Task not found";
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
