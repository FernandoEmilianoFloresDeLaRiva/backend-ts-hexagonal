import { User } from "../entities";

export interface UserRepository {
  getUsers(): Promise<User[]>;
  getUserByEmail(email: string): Promise<User>;
  createUser(user: User): Promise<User>;
  deleteUserByEmail(email: string): Promise<void>;
  updateUserByEmail(emailKey: string, user: User): Promise<User>;
}
