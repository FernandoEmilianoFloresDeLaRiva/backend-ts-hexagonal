import bcrypt from "bcrypt"
import { BCYPT_SPACE } from "../../domain/constants";

export const createPasswordHash = (password : string) => {
    return bcrypt.hashSync(password, BCYPT_SPACE);
}