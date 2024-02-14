
export interface PasswordHashRepository {
  createPasswordHash(password: string, spaceBcrypt : number): string;
  compareCredentials(originalPassword : string, passwordRequest: string): boolean;
}
