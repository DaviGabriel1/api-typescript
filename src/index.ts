import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";
import { authenticateToken } from "./middleware/verifyToken"; // Import do middleware

const main = async () => {
    config();

    const app = express();

    app.use(express.json()); // Converte o JSON

    await MongoClient.connect();

    // Protegendo as rotas com o middleware
    app.get("/users", authenticateToken, async (req, res) => {
        const mongoGetUsersRepository = new MongoGetUsersRepository();
        const getUsersController = new GetUsersController(mongoGetUsersRepository);
        const { body, statusCode } = await getUsersController.handle();
        res.status(statusCode).send(body);
    });

    app.post("/users", authenticateToken, async (req, res) => {
        const mongoCreateUserRepository = new MongoCreateUserRepository();
        const createUserController = new CreateUserController(mongoCreateUserRepository);
        const { body, statusCode } = await createUserController.handle({
            body: req.body,
        });
        res.status(statusCode).send(body);
    });

    const port = process.env.PORT || 8000;

    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
};

main();
