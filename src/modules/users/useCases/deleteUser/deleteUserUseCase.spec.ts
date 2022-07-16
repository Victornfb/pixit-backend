import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { AppError } from "@shared/errors/AppError";
import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { ListUsersUseCase } from "../listUsers/ListUsersUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let deleteUserUseCase: DeleteUserUseCase;
let listUsersUseCase: ListUsersUseCase;

describe('Update user', () => {

	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
		deleteUserUseCase = new DeleteUserUseCase(usersRepositoryInMemory);
		listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
	});

	it('should be able to delete a existing user', async () => {
		const user = await createUserUseCase.execute({
			name: 'John Doe',
			email: 'john@doe.com',
			password: 'abcdefg',
		});

		const { id } = await createUserUseCase.execute({
			name: 'Harley Davidson',
			email: 'harley@pixit.com',
			password: 'abcdefg',
		});

		await deleteUserUseCase.execute({
			user_id: id,
		});

		const result = await listUsersUseCase.execute();

		expect(result).not.toEqual(
			expect.arrayContaining([
				expect.objectContaining({id})
			])
		);
	});

	it('should not be able to delete a non-existing user', async () => {
		expect(async () => {
			await deleteUserUseCase.execute({
				user_id: 1234567,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

});