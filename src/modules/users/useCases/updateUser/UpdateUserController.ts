import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const { name, password } = req.body;

		if (isNaN(Number(id))) {
			throw new AppError('Invalid ID');
		}

		const updateUserUseCase = container.resolve(UpdateUserUseCase);

		const user = await updateUserUseCase.execute({
			user_id: Number(id),
			name,
			password,
		});

		return res.status(200).json(user);
	}
}

export { UpdateUserController };

