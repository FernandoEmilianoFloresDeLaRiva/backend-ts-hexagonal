import { User, UserResponse } from "../entities";

export function getUserDto(user: User): UserResponse {
    return {
        email : user.email,
        username : user.username
    }
}
