import { getTasksDto } from "../../domain/dtos/getTasks.dto";
import { TaskResponse } from "../../domain/interfaces";
import { TaskRepository } from "../../domain/repository/taskRepository";

export class GetTasksService {
  constructor(private readonly TaskRepository: TaskRepository) {}
  async run(): Promise<TaskResponse[] | string> {
    try {
      const response = await this.TaskRepository.getTasks();
      if (response.length) {
        const formatedResponse = getTasksDto(response);
        return formatedResponse;
      }
      return "There are no tasks";
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
