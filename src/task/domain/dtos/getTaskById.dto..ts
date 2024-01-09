import { TaskResponse, Task } from "../entities";

export function getTaskByIdDto(task: Task): TaskResponse {
  return {
    title: task.title || "",
    description: task.description || "",
  };
}
