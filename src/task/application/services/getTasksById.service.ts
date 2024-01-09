import { getTaskByIdDto } from "../../domain/dtos";
import { TaskRepository } from "../../domain/repository/taskRepository";
import { TaskResponse } from "../../domain/entities";

export class GetTaskByIdService {
  constructor(private readonly TaskRepository: TaskRepository) {}
  async run(taskId: number): Promise<TaskResponse> {
    try {
      const response = await this.TaskRepository.getTaskById(taskId);
      if (response) {
        console.log(response)
        const formatedResponse = getTaskByIdDto(response);
        return formatedResponse;
      }
      return {} as TaskResponse;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
