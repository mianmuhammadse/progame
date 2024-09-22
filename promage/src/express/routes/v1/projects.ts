import { Router, Request, Response } from 'express';
import {
	getAllProjects,
	createProject,
	getProjectById,
	updateProject,
	deleteProject,
} from '../../../services/project-service';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API for managing projects
 * /projects:
 *   get:
 *     summary: Get all projects
 *     description: Retrieve a list of all projects.
 *     tags:
 *       - Projects
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The project ID.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The name of the project.
 *                     example: New Website
 *                   description:
 *                     type: string
 *                     description: Details about the project.
 *                     example: This is a project to create a new website.
 *       500:
 *         description: Failed to fetch projects
 */
router.get('/', async (req: Request, res: Response) => {
	try {
		const projects = await getAllProjects();
		res.json(projects);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch projects' });
	}
});

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API for managing projects
 *
 * /projects:
 *   post:
 *     summary: Create a new project
 *     description: Add a new project to the system.
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New API Development
 *               description:
 *                 type: string
 *                 example: This is a project to develop a new API.
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-09-21T14:30:00Z
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-09-22T14:30:00Z
 *               managerId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Project created successfully
 *       500:
 *         description: Failed to create project
 */
router.post('/', async (req: Request, res: Response) => {
	try {
		const project = await createProject(req.body);
		res.json(project);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Failed to create project' });
	}
});

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API for managing projects
 *
 * /projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     description: Retrieve a project by its ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The project ID.
 *     responses:
 *       200:
 *         description: Project found
 *       404:
 *         description: Project not found
 *       500:
 *         description: Failed to fetch project
 */
router.get('/:id', async (req: Request, res: Response) => {
	try {
		const project = await getProjectById(Number(req.params.id));
		if (!project) return res.status(404).send('Project not found');
		res.json(project);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch project' });
	}
});

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API for managing projects
 *
 * /projects/{id}:
 *   put:
 *     summary: Update a project
 *     description: Update an existing project.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The project ID.
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: This is an updated project description.
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-09-21T14:30:00Z
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-09-22T14:30:00Z
 *               managerId:
 *                 type: integer
 *                 example: 1
 *               isRunning:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Failed to update project
 */
router.put('/:id', async (req: Request, res: Response) => {
	try {
		const project = await updateProject(Number(req.params.id), req.body);
		res.json(project);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Failed to update project' });
	}
});

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API for managing projects
 *
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     description: Delete a project by its ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The project ID.
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       500:
 *         description: Failed to delete project
 */
router.delete('/:id', async (req: Request, res: Response) => {
	try {
		await deleteProject(Number(req.params.id));
		res.send('Project deleted');
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Failed to delete project' });
	}
});

export default router;
