import { User } from "../entities";

export interface UserRepository {
  getUsers(): Promise<User[]>;
  getUsersById(id_user: number): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  createUser(user: User): Promise<User>;
  deleteUserById(id_user: number): Promise<void>;
  updateUserById(id_user: number, user: User): Promise<User>;
}
