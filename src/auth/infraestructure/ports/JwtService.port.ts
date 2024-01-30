import jwt from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../../domain/constants/secretKeyJwt";
import { TokenRepository } from "../../domain/repository/TokenRepository";
import { User } from "../../../user/domain/entities";

export class JwtService implements TokenRepository {
  private secretKey: string = SECRET_KEY_JWT;
  createToken(user: User): string {
    console.log(user);
    const payload = {
      email: user.email,
    };
    console.log(payload);
    const token = jwt.sign(payload, this.secretKey, { expiresIn: "1h" });
    return token;
  }
  verifyToken(token: string): void {
    jwt.verify(token, SECRET_KEY_JWT, (err, _decodeToken) => {
      if (err) {
        throw new Error(err.message);
      }
    });
  }
}
