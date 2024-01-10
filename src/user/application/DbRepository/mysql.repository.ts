import { ConnectionOptions, createConnection } from "mysql2";
import { mySqlConnectionRepository } from "../../../shared/mySql/domain/repository/mySqlConnectionRepository";
import { User } from "../../domain/entities";
import { UserRepository } from "../../domain/repository/userRepository";
import dotenv from "dotenv"

dotenv.config()

const configConnection: ConnectionOptions = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const newDb = createConnection(configConnection)
const dbPromise = newDb.promise()

export class MySqlRepositoryUser implements UserRepository {
  private db: mySqlConnectionRepository;
  constructor(db: mySqlConnectionRepository) {
    this.db = db;
  }
  getUserByEmail(email: string): Promise<User> {
    const query = "select * from users where email = ?";
    return dbPromise.execute(query, [email]).then((res : any) => {
      console.log(res)
      return res[0][0] as User
    });
  }
  getUsers(): Promise<User[]> {
    const query = "select * from users";
    return this.db.execute(query).then((res) => res[0] as User[]);
  }
  getUsersById(id_user: number): Promise<User> {
    const query = "select * from users where id_user = ?";
    return this.db.execute(query, [id_user]).then((res) => res[0] as User);
  }
  createUser(user: User): Promise<User> {
    const { email, password, username } = user;
    const query =
      "insert into users (email, password, username) values (?,?,?)";
    return this.db
      .execute(query, [email, password, username])
      .then((res) => res.values as User);
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
