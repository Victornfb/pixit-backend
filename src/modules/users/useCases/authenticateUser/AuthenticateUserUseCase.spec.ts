import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { AppError } from "@shared/errors/AppError";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate user', () => {

	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
	});

	it('should be able to authenticate a user', async () => {
		const user: ICreateUserDTO = {
			name: 'John Doe',
			email: 'john@doe.com',
			password: '1234',
		};

		await createUserUseCase.execute(user);

		const result = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password,
		});

		expect(result).toHaveProperty('token');
	});

	it('should not be able to authenticate a non existing user', async () => {
		expect(async () => {
			await authenticateUserUseCase.execute({
				email: 'false@email.com',
				password: '1234',
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to authenticate if password is incorrect', async () => {
		expect(async () => {
			const user: ICreateUserDTO = {
				name: 'Harley Davidson',
				email: 'harley@davidson.com',
				password: '5678',
			};
	
			await createUserUseCase.execute(user);

			await authenticateUserUseCase.execute({
				email: 'harley@davidson.com',
				password: '9999',
			});
		}).rejects.toBeInstanceOf(AppError);
	});

});