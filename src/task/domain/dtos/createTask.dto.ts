import { Task } from "../interfaces/task";

export function createTaskDto(task: Task) : Task {
  return {
    idUser : task.idUser,
    idTask: task.idTask,
    title: task.title,
    description: task.description,
  };
}
