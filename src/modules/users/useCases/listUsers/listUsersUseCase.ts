import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListUsersUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	async execute(): Promise<User[]> {
		const users = await this.usersRepository.findAll();
		return users;
	}
}

export { ListUsersUseCase };

