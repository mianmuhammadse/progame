import { Router, Application, Request, Response, NextFunction } from 'express';
import projectRoutes from './projects';
import taskRoutes from './tasks';
import managerRoutes from './managers';

const index = (app: Application) => {
	app.use((req: Request, res: Response, next: NextFunction) => {
		console.log(req.method, req.url);
		next();
	});

	const router = Router();

	app.use('/v1', router);
	app.get('/', (req: Request, resp: Response) => {
		resp.status(200).send({ application: 'Hello World!!' });
	});

	router.use('/managers', managerRoutes);
	router.use('/projects', projectRoutes);
	router.use('/tasks', taskRoutes);
};

export default index;
