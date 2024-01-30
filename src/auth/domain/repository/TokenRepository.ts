import { User } from "../../../user/domain/entities";

export interface TokenRepository {
  createToken(user: User): string;
  verifyToken(token: string): void;
}
