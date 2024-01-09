import { Task, TaskResponse } from "../entities";
import { getTaskByIdDto } from "./getTaskById.dto.";

export function getTasksDto(tasks: Task[]): TaskResponse[] {
  const formatedtasks: TaskResponse[] = [];
  tasks.forEach((task) => {
    formatedtasks.push(getTaskByIdDto(task));
  });
  return formatedtasks;
}
