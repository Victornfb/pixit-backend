import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase';
import { container } from 'tsyringe';
import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async(host = 'localhost'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  const connection = createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  );

  return connection;
}