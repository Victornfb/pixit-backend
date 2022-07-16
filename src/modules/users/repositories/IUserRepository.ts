import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from '@modules/users/infra/typeorm/entities/User';

interface IUsersRepository {
	create(data: ICreateUserDTO): Promise<Omit<User, 'password'>>;
	findByEmail(email: string): Promise<User>;
	findById(id: number): Promise<User>;
	findAll(): Promise<User[]>;
	deleteById(id: number): Promise<void>;
}

export { IUsersRepository };

