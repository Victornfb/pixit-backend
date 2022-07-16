import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateUserUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	async execute({name, email, password}: ICreateUserDTO): Promise<Omit<User, 'password'>> {
		if (!name || !email || !password) {
			throw new AppError(`Required fields missing`);
		}

		const userAlreadyExists = await this.usersRepository.findByEmail(email);

		if (userAlreadyExists) {
			throw new AppError(`User already exists`);
		}

		const passwordHash = await hash(password, 8);

		const user = await this.usersRepository.create({
			name,
			email,
			password: passwordHash
		});

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			created_at: user.created_at,
			updated_at: user.updated_at
		};
	}
}

export { CreateUserUseCase };

