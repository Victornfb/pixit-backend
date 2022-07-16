import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { AppError } from "@shared/errors/AppError";
import { AuthenticateUserUseCase } from "@modules/users/useCases/authenticateUser/AuthenticateUserUseCase";


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create user', () => {

	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
	});

	it('should be able to create a new user', async () => {
		const user: ICreateUserDTO = {
			name: 'John Doe',
			email: 'john@doe.com',
			password: 'abcdef',
		};

		const result = await createUserUseCase.execute(user);

		expect(result).toHaveProperty('id');
	});

	it('should not be able to create a existing user', async () => {
		expect(async () => {
			const user: ICreateUserDTO = {
				name: 'John Doe',
				email: 'john@doe.com',
				password: 'abcdef',
			};
	
			await createUserUseCase.execute(user);

			await createUserUseCase.execute(user);
		}).rejects.toBeInstanceOf(AppError);
	});

});