import 'express-async-errors';
import '@shared/container';
import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import { AppError } from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm';
import { router } from '@shared/infra/http/routes';
import SwaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';

createConnection();
const app = express();

app.use(cors());

app.use(express.json());

app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			message: err.message,
		});
	}

	return res.status(500).json({
		status: 'error',
		message: `Internal server error: ${err.message}`,
	});
});

const port = 3333;
app.listen(port, () => console.log('Server is now running on port ' + port));