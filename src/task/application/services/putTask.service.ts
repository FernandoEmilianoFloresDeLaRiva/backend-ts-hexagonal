import { Task, TaskResponse } from "../../domain/entities";
import { TaskRepository } from "../../domain/repository/taskRepository";

export class PutTaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
  async run(task: Task, idTask: number): Promise<TaskResponse> {
    try {
      const originalTask = this.taskRepository.getTaskById(idTask);
      if (!(task.description && task.title && originalTask)) throw new Error("Task not found");
      return await this.taskRepository.updateTask(idTask, task);
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
