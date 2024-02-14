import { User } from "../../../user/domain/entities";
import { PasswordHashRepository } from "../../domain/repository";

export class CompareCredentialsService {
  constructor(private readonly bcryptPort: PasswordHashRepository) {}
  async run(user: User, reqPassword: string): Promise<boolean> {
    try {
      const { password } = user;
      const credentials = await this.bcryptPort.compareCredentials(
        password,
        reqPassword
      );
      return credentials;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
