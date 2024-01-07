import { Task } from "../../domain/interfaces";
import { TaskRepository } from "../../domain/repository/taskRepository";
import { mySqlConnectionRepository } from "../../../mySql/domain/repository/mySqlConnectionRepository";

export class MySQLRepository implements TaskRepository {
  private db: mySqlConnectionRepository;

  constructor(db: mySqlConnectionRepository) {
    this.db = db;
  }

  getTasks(): Promise<Task[]> {
    const query = "SELECT * FROM tasks";
    return this.db.execute(query).then((res) => {
      return res[0] as Task[];
    });
  }

  getTaskById(taskId: number): Promise<Task[]> {
    const query = "SELECT * FROM tasks where idTask = ?";
    return this.db
      .execute(query, [taskId])
      .then((res) => {
        return res[0] as Task[];
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  createTask(task: Task): Promise<Task> {
    const { idUser, idTask, title, description } = task;
    const query = `insert into tasks (idTask, idUser, title, description) values (?,?,?,?)`;
    return this.db
      .execute(query, [idTask, idUser, title, description])
      .then(() => {
        return task;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  deleteTask(taskId: number): Promise<Task[]> {
    throw new Error("Method not implemented.");
  }
  updateTask(idTask: number, task: Task): Promise<void> {
    throw new Error("Method not implemented.");
  }
}