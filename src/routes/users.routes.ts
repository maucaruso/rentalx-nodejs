import { Router } from "express";

import { CreateUserUseController } from "../modules/accounts/useCases/createUser/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserUseController();

usersRoutes.post("/", createUserController.handle);

export { usersRoutes };
