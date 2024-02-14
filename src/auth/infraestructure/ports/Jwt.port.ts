import jwt from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../../domain/constants/secretKeyJwt";
import { TokenRepository } from "../../domain/repository/TokenRepository";

export class JwtPort implements TokenRepository {
  private secretKey: string = SECRET_KEY_JWT;
  createToken(payload: any): string {
    const token = jwt.sign(payload, this.secretKey, { expiresIn: "1h" });
    return token;
  }
  verifyToken(token: string): void {
    jwt.verify(token, this.secretKey, (err, _decodeToken) => {
      if (err) {
        throw new Error(err.message);
      }
    });
  }
}
