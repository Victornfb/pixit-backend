import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import createConnection from '../index'

async function create() {
	const connection = await createConnection('localhost');

	const password = await hash('admin', 8);

	await connection.query(
		`insert into users (name, email, password, updated_at, created_at)
		values ('Admin', 'admin@pixit.com.br', '${password}', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())`
	);

	await connection.close();
}

create().then(() => { console.log('User admin created') });