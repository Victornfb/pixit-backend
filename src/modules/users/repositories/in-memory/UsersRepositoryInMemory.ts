import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from "@modules/users/repositories/IUserRepository";

class UsersRepositoryInMemory implements IUsersRepository {
	users: User[] = [];

	async create({name, password, email}: ICreateUserDTO): Promise<Omit<User, 'password'>> {
		const user = new User();

		Object.assign(user, {
			id: this.users.length + 1,
			name,
			password,
			email
		});

		this.users.push(user);

		return { ...user };
	}

	async findByEmail(email: string): Promise<User> {
		return this.users.find(user => user.email === email);
	}

	async findById(id: number): Promise<User> {
		return this.users.find(user => user.id === id);
	}

	async findAll(): Promise<User[]> {
		return this.users;
	}

	deleteById(id: number): Promise<void> {
		this.users = this.users.filter(user => user.id !== id);
		return;
	}

}

export { UsersRepositoryInMemory };

