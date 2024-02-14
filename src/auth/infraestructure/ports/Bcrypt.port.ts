import bcrypt from "bcrypt";
import { PasswordHashRepository } from "../../domain/repository/PasswordHashRepository";

export class BcryptPort implements PasswordHashRepository {
  createPasswordHash(password: string, spaceBcrypt: number) {
    return bcrypt.hashSync(password, spaceBcrypt);
  }
  compareCredentials(
    originalPassword: string,
    passwordRequest: string
  ): boolean {
    const correctPassword = bcrypt.compareSync(
      originalPassword,
      passwordRequest
    );
    return correctPassword;
  }
}
