import { getTasksDto } from "../../domain/dtos/getTasks.dto";
import { TaskResponse } from "../../domain/entities";
import { TaskRepository } from "../../domain/repository/taskRepository";

export class GetTasksService {
  constructor(private readonly TaskRepository: TaskRepository) {}
  async run(): Promise<TaskResponse[]> {
    try {
      const response = await this.TaskRepository.getTasks();
      if (response) {
        const formatedResponse = getTasksDto(response);
        return formatedResponse;
      }
      return response;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
