import { Task, TaskResponse } from "../../domain/entities";
import { TaskRepository } from "../../domain/repository/taskRepository";
import { validateTask } from "../../domain/validators/task.validator";

export class CreateTaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
  async run(task: Task): Promise<TaskResponse> {
    try {
      const resultValidation = validateTask(task);
      if (resultValidation.success) {
        const response = await this.taskRepository.createTask(
          resultValidation.data
        );
        return response;
      }
      //Se añade valor de validacion, por lo que no sera string
      throw new Error(resultValidation.error.message);
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
