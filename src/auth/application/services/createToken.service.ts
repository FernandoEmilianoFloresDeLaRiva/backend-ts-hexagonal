import { User } from "../../../user/domain/entities";
import { TokenRepository } from "../../domain/repository";

export class CreateTokenService {
  constructor(private readonly tokenPort: TokenRepository) {}
  async run(user: User): Promise<string> {
    try {
      const payload = {
        email: user.email,
      };
      const token = await this.tokenPort.createToken(payload);
      return token;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
