import { TaskRepository } from "../../domain/repository/taskRepository";

export class DeleteTaskService {
  constructor(private taskRepository: TaskRepository) {}
  async run(taskId: number) : Promise<boolean> {
    try {
      const findTask = await this.taskRepository.getTaskById(taskId);
      if (findTask) {
        await this.taskRepository.deleteTask(taskId);
        return true;
      }
      return false;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
