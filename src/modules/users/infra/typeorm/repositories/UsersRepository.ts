import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from "@modules/users/repositories/IUserRepository";
import { getRepository, Repository } from "typeorm";

class UsersRepository implements IUsersRepository {
	private repository: Repository<User>

	constructor() {
		this.repository = getRepository(User);
	}

	async create({id, name, password, email}: ICreateUserDTO): Promise<Omit<User, 'password'>> {
		const user = this.repository.create({
			id,
			name,
			password,
			email,
			updated_at: new Date(),
		});

		await this.repository.save(user);

		return user;
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.repository.findOne({ email });
		return user;
	}

	async findById(id: number): Promise<User> {
		const user = await this.repository.findOne(id);
		return user;
	}

	async findAll(): Promise<User[]> {
		const users = await this.repository.find({ select: ["id", "name", "email", "created_at", "updated_at"] });
		return users;
	}

	async deleteById(id: number): Promise<void> {
		await this.repository.delete({ id });
		return;
	}

}

export { UsersRepository };

