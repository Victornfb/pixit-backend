import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { DeleteUserController } from "@modules/users/useCases/deleteUser/DeleteUserController";
import { ListUsersController } from "@modules/users/useCases/listUsers/listUsersController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";
import { Router } from "express";
import { certifyAuthentication } from "../middlewares/certifyAuthentication";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

usersRoutes.get('/', certifyAuthentication, listUsersController.handle);
usersRoutes.post('/', certifyAuthentication, createUserController.handle);
usersRoutes.put('/:id', certifyAuthentication, updateUserController.handle);
usersRoutes.delete('/:id', certifyAuthentication, deleteUserController.handle);

export { usersRoutes };

