import { User } from "../../../user/domain/entities";

export interface PasswordHashRepository {
  createPasswordHash(password: string): string;
  compareCredentials(user: User, passwordRequest: string): boolean;
}
