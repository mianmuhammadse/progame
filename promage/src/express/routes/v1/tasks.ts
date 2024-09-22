import { Router, Request, Response } from 'express';
import { getTasksByProject, createTask, updateTask, deleteTask } from '../../../services/task.service';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API for managing tasks
 * 
 * /tasks/project/{projectId}:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve a list of all tasks.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The project ID.
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                   endDate:
 *                     type: string
 *                   projectId:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string

 *       500:
 *         description: Failed to fetch tasks
 * 
 */
router.get('/project/:projectId', async (req: Request, res: Response) => {
	try {
		const tasks = await getTasksByProject(Number(req.params.projectId));
		res.json(tasks);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch tasks' });
	}
});

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API for managing tasks
 * 
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Add a new task to the system.
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-09-21T14:30:00Z
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-09-22T14:30:00Z
 *               projectId:
 *                 type: integer
 *             required:
 *               - description
 *               - status
 *               - startDate
 *               - endDate
 *               - projectId
 *     responses:
 *       200:
 *         description: Task created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *                 startDate:
 *                   type: string
 *                 endDate:
 *                   type: string
 *                 projectId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       500:
 *         description: Failed to create task
 * 
 */
router.post('/', async (req: Request, res: Response) => {
	try {
		const task = await createTask(req.body);
		res.json(task);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Failed to create task' });
	}
});

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API for managing tasks
 * 
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Update a task by its ID.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-09-21T14:30:00Z
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-09-22T14:30:00Z
 *               projectId:
 *                 type: integer
 *             required:
 *               - description
 *               - status
 *               - startDate
 *               - endDate
 *               - projectId
 *     responses:
 *       200:
 *         description: Task updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *                 startDate:
 *                   type: string
 *                 endDate:
 *                   type: string
 *                 projectId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       500:
 *         description: Failed to update task
 * 
 */
router.put('/:id', async (req: Request, res: Response) => {
	try {
		const task = await updateTask(Number(req.params.id), req.body);
		res.json(task);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Failed to update task' });
	}
});

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API for managing tasks
 * 
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Delete a task by its ID.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task ID.
 *     responses:
 *       200:
 *         description: Task deleted
 *       500:
 *         description: Failed to delete task
 *
 */
router.delete('/:id', async (req: Request, res: Response) => {
	try {
		await deleteTask(Number(req.params.id));
		res.send('Task deleted');
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete task' });
	}
});

export default router;
