import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

interface IRequest {
	user_id: number;
	name?: string;
	password?: string;
}

@injectable()
class UpdateUserUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	async execute({ user_id, name, password }: IRequest): Promise<Omit<User, 'password'>> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('User not found');
		}

		user.name = name && name;
		user.password = password && await hash(password, 8);
		user.updated_at	= new Date();

		await this.usersRepository.create(user);

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			created_at: user.created_at,
			updated_at: user.updated_at
		};
	}
}

export { UpdateUserUseCase };

