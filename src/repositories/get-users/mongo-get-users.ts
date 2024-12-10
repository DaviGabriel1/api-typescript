import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository{
    constructor(){}
    async getUsers(): Promise<User[]> {
        const users = await MongoClient.db.
        collection<Omit<User,"id">>("users").
        find({}).toArray(); //omite o id do user da interface

        return users.map(({_id,...rest}) => ({...rest, id: _id.toHexString()}));
    }
}