import { Task } from "../interfaces/task";
import { getTaskByIdDto } from "./getTaskById.dto.";
import { TaskResponse } from "../interfaces";

export function getTasksDto(tasks: Task[]): TaskResponse[] {
  const formatedtasks: TaskResponse[] = [];
  tasks.forEach((task) => {
    formatedtasks.push(getTaskByIdDto(task));
  });
  return formatedtasks;
}
