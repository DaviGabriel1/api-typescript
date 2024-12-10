import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { CreateUserParams, ICreateUserController, IcreateUserRepository } from "./protocols";

export class CreateUserController implements ICreateUserController{
    constructor(private readonly createUserRepository: IcreateUserRepository){}
    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        try{
            const requiredFields = ["firstName","lastName","email","password"];

            for(const field of requiredFields){
                if(!httpRequest?.body?.[field as keyof CreateUserParams]?.length){
                    return {
                        statusCode: 400,
                        body: `field ${field} is required`
                    };
                }
            }


            if(!httpRequest.body){
                return {
                    statusCode:400,
                    body: "please specify a body"
                };
            }

            const user = await this.createUserRepository.createUser(httpRequest.body);

            return {
                statusCode: 205,
                body: user
                };
        } catch(error){
            return {
                statusCode:500,
                body: "something went wrong "+error
            };
        }
    }
}