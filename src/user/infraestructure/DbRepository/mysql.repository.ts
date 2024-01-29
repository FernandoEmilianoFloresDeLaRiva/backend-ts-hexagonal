import { db } from "../../../shared/application/mysqlConnection";
import { User } from "../../domain/entities";
import { UserRepository } from "../../domain/repository/userRepository";

export class MySqlRepositoryUser implements UserRepository {
  getById(idTask: number): Promise<User> {
    const query = "select * from users where id_user = ?";
    return db.execute(query, [idTask]).then((res: any) => {
      return res[0][0] as User;
    });
  }
  getUserByEmail(email: string): Promise<User> {
    const query = "select * from users where email = ?";
    return db.execute(query, [email]).then((res: any) => {
      console.log(res[0]);
      return res[0][0] as User;
    });
  }
  getUsers(): Promise<User[]> {
    const query = "select * from users";
    return db.execute(query).then((res: any) => res[0] as User[]);
  }
  createUser(user: User): Promise<User> {
    const { email, password, username } = user;
    const query =
      "insert into users (email, password, username) values (?,?,?)";
    return db
      .execute(query, [email, password, username])
      .then((res: any) => res.values as User);
  }
  deleteUserByEmail(email: string): Promise<void> {
    const query = "delete from users where email = ?";
    return db.execute(query, [email]).then((res: any) => res[0] as void);
  }
  updateUserByEmail(emailKey: string, user: User): Promise<User> {
    const { email, password, username } = user;
    const query =
      "update users set email = ?, password = ?, username = ? where email = ?";
    return db
      .execute(query, [email, password, username, emailKey])
      .then((res: any) => res[0] as User);
  }
}
