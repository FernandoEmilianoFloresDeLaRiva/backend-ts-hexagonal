import { Task, TaskResponse } from "../../domain/interfaces";
import { TaskRepository } from "../../domain/repository/taskRepository";

export class PutTaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
  async run(task: Task, idTask: number): Promise<TaskResponse | string> {
    try {
      if (!(task.description && task.idTask && task.idUser && task.title))
        return "Task invalidated";
      await this.taskRepository.updateTask(idTask, task);
      return task;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
