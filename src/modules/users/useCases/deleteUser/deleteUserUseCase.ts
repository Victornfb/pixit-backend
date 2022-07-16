import { IUsersRepository } from "@modules/users/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
	user_id: number;
}

@injectable()
class DeleteUserUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	async execute({ user_id }: IRequest): Promise<void> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('User not found');
		}

		await this.usersRepository.deleteById(user_id);
		return;
	}
}

export { DeleteUserUseCase };

