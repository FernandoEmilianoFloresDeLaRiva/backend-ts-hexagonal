import { db } from "../../../shared/application/mysqlConnection";
import { Task } from "../../domain/entities";
import { TaskRepository } from "../../domain/repository/taskRepository";

export class MySQLRepositoryTask implements TaskRepository {
  getTasks(): Promise<Task[]> {
    const query = "SELECT * FROM tasks";
    return db.execute(query).then((res: any) => {
      return res[0] as Task[];
    });
  }

  getTaskById(taskId: number): Promise<Task> {
    const query = "SELECT * FROM tasks where idTask = ?";
    return db
      .execute(query, [taskId])
      .then((res: any) => {
        console.log(res)
        return res[0][0] as Task;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  createTask(task: Task): Promise<Task> {
    const { title, description } = task;
    const query = `insert into tasks (title, description) values (?,?)`;
    return db
      .execute(query, [title, description])
      .then(() => {
        return task;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  deleteTask(taskId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateTask(idTask: number, task: Task): Promise<Task> {
    throw new Error("Method not implemented.");
  }
}
