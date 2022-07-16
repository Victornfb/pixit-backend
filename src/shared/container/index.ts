import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUserRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository
);