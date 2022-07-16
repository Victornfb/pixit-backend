import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { AppError } from "@shared/errors/AppError";
import { AuthenticateUserUseCase } from "@modules/users/useCases/authenticateUser/AuthenticateUserUseCase";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let updateUserUseCase: UpdateUserUseCase;

describe('Update user', () => {

	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
		updateUserUseCase = new UpdateUserUseCase(usersRepositoryInMemory);
	});

	it('should be able to update a existing user', async () => {
		const user: ICreateUserDTO = {
			name: 'John Doe',
			email: 'john@doe.com',
			password: 'abcdefg',
		};

		const { id: user_id } = await createUserUseCase.execute(user);

		const result = await updateUserUseCase.execute({
			user_id,
			name: 'John Doe Edited',
			password: 'abcdefg',
		});

		expect(result.name).toMatch('John Doe Edited');
	});

	it('should not be able to update a non-existing user', async () => {
		expect(async () => {
			await updateUserUseCase.execute({
				user_id: 999999,
				name: 'John Doe Edited',
				password: 'abcdefg',
			});
		}).rejects.toBeInstanceOf(AppError);
	});

});