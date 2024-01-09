import { Task, TaskResponse } from "../../domain/entities";
import { TaskRepository } from "../../domain/repository/taskRepository";

export class CreateTaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
  async run(task: Task) : Promise<TaskResponse> {
    try {
      if (task.description && task.title) {
        const response = await this.taskRepository.createTask(task);
        return response;
      }
      //Se añade valor de validacion, por lo que no sera string
      throw new Error("There was an error creating the task");
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
