import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository{
    constructor(){}
    async getUsers(): Promise<User[]> {
        return [
            {
            firstName: "Davi",
            lastName: "Santos",
            email: "davi@gmail.com",
            password: "123",
        },
    ];
    }
}