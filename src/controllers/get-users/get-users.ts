import { IGetUsersControllers, IGetUsersRepository } from "./protocols";

export class GetUsersController implements IGetUsersControllers{
    constructor(private readonly getUsersRepository:IGetUsersRepository){}

    async handle(){
        try{
            const users = await this.getUsersRepository.getUsers();
            return {
                statusCode:200,
                body:users,
            };
        }
        catch(error){
            return {
                statusCode:500,
                body: `something went wrong: ${error}`
            };
        }
    }
}