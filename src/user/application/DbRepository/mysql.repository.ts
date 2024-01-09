import { mySqlConnectionRepository } from "../../../shared/mySql/domain/repository/mySqlConnectionRepository";
import { User } from "../../domain/entities";
import { UserRepository } from "../../domain/repository/userRepository";

export class MySqlRepositoryUser implements UserRepository {
  private db: mySqlConnectionRepository;
  constructor(db: mySqlConnectionRepository) {
    this.db = db;
  }
  getUsers(): Promise<User[]> {
    const query = "select * from users";
    return this.db.execute(query).then((res) => res[0] as User[]);
  }
  getUsersById(id_user: number): Promise<User> {
    const query = "select * from users where id_user = ?";
    return this.db.execute(query, [id_user]).then((res) => res[0] as User);
  }
  deleteUserById(id_user: number): Promise<void> {
    const query = "delete from users where id_user = ?";
    return this.db.execute(query, [id_user]).then((res) => res[0] as void);
  }
  updateUserById(id_user: number, user: User): Promise<User> {
    const { email, password, username } = user;
    const query =
      "update users set email = ?, password = ?, username = ? where id_user = ?";
    return this.db
      .execute(query, [email, password, username, id_user])
      .then((res) => res[0] as User);
  }
}
