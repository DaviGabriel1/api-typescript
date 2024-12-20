import { CreateUserParams, IcreateUserRepository } from "../../controllers/create-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoCreateUserRepository implements IcreateUserRepository{
 async createUser(params: CreateUserParams): Promise<User> {
    const {insertedId} =await MongoClient.db.collection('users').insertOne(params);

    const user = await MongoClient.db.collection<Omit<User,"id">>("users").findOne({_id:insertedId});

    if(!user){
        throw new Error('user not created');
    }

    const {_id, ...rest} = user;
    return {id: _id.toHexString(), ...rest};
 }
}