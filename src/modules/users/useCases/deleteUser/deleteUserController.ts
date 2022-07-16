import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

class DeleteUserController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		if (isNaN(Number(id))) {
			throw new AppError('Invalid ID');
		}

		const deleteUserUseCase = container.resolve(DeleteUserUseCase);

		await deleteUserUseCase.execute({
			user_id: Number(id),
		});

		return res.status(204).send();
	}
}

export { DeleteUserController };