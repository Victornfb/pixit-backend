import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { AppError } from "@shared/errors/AppError";
import { ListUsersUseCase } from "../listUsers/ListUsersUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let listUsersUseCase: ListUsersUseCase;

describe('List users', () => {

	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
		listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
	});

	it('should be able to list all users', async () => {
		const user = await createUserUseCase.execute({
			name: 'John Doe',
			email: 'john@doe.com',
			password: 'abcdefg',
		});

		const result = await listUsersUseCase.execute();

		expect(result).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: user.id,
					name: user.name,
					email: user.email,
				})
			])
		);
	});

});