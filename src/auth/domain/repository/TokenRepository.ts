export interface TokenRepository {
  createToken(user: any): string;
  verifyToken(token: string): void;
}
