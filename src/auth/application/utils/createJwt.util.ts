import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { AuthResponse } from "../../domain/entities";

dotenv.config()
const JWTSECRET = process.env.JWTSECRET || "123455"

export const createJwt = (user : any) => {
    console.log(user)
    const payload  = {
        email : user.email,
    }
    console.log(payload)
    const token = jwt.sign(payload, JWTSECRET, { expiresIn: "1h" });
    return token;
}