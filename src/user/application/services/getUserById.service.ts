import { getUserDto } from "../../domain/dtos";
import { UserResponse } from "../../domain/entities";
import { UserRepository } from "../../domain/repository/userRepository";


export class GetUserById {
    constructor(private readonly userRepository: UserRepository){}
    async run (id_user : number) : Promise<UserResponse>{
        try{
            const response = await this.userRepository.getUsersById(id_user);
            if(response){
                const formatedResponse = getUserDto(response);
                return formatedResponse;
            }
            return {} as UserResponse;
        }catch(err : any){
            console.error(err);
            throw new Error(err);
        }
    }
}