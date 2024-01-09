import { User } from "../entities";

export interface UserRepository {
  getUsers(): Promise<User[]>;
  getUsersById(id_user: number): Promise<User>;
  deleteUserById(id_user: number): Promise<void>;
  updateUserById(id_user: number, user: User): Promise<User>;
}
