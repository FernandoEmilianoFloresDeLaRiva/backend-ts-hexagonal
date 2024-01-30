import bcrypt from "bcrypt";
import { BCYPT_SPACE } from "../../domain/constants";
import { User } from "../../../user/domain/entities";
import { PasswordHashRepository } from "../../domain/repository/PasswordHashRepository";

export class BcryptService implements PasswordHashRepository {
  private spaceBcrypt: number = BCYPT_SPACE;
  createPasswordHash(password: string) {
    return bcrypt.hashSync(password, this.spaceBcrypt);
  }
  compareCredentials(user: User, passwordRequest: string): boolean {
    const correctPassword = bcrypt.compareSync(user.password, passwordRequest);
    return correctPassword;
  }
}
