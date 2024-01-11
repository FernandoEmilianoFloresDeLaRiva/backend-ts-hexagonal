import jwt from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../../domain/constants/secretKeyJwt";

export const createJwt = (user : any) => {
    console.log(user)
    const payload  = {
        email : user.email,
    }
    console.log(payload)
    const token = jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: "1h" });
    return token;
}