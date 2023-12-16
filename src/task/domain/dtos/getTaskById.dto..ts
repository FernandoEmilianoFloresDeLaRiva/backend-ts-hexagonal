import { TaskResponse, Task } from "../interfaces";

export function getTaskByIdDto(task: Task): TaskResponse {
  return {
    title: task.title || "",
    description: task.description || "",
  };
}
