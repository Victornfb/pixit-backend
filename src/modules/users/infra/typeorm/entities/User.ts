import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
class User {

	@PrimaryGeneratedColumn()
	id?: number;
	@Column()
	name: string;
	@Column()
	password: string;
	@Column()
	email: string;
	@CreateDateColumn()
	updated_at: Date;
	@CreateDateColumn()
	created_at: Date;

}

export { User };

