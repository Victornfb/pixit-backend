import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

class CreateUserController {

	async handle(req: Request, res: Response): Promise<Response> {
		const { name, password, email } = req.body;
		const createUserUseCase = container.resolve(CreateUserUseCase);

		const user = await createUserUseCase.execute({
			name,
			password,
			email
		});

		return res.status(201).json(user);
	}
}

export { CreateUserController };

