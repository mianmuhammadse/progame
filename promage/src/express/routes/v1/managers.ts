import { Router, Request, Response } from 'express';
import {
  getAllManagers,
  createManager,
  getManagerById,
  updateManager,
  deleteManager,
} from '../../../services/manager.service';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Managers
 *   description: API for managing managers
 * 
 * /managers:
 *   get:
 *     summary: Get all managers
 *     description: Retrieve a list of all managers.
 *     tags:
 *       - Managers
 *     responses:
 *       200:
 *         description: List of managers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *                   projects:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
 *                         startDate:
 *                           type: string
 *                         endDate:
 *                           type: string
 *                         isRunning:
 *                           type: boolean
 *                         managerId:
 *                           type: integer
 *                       
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const managers = await getAllManagers();
    res.json(managers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch managers' });
  }
});

/**
 * @swagger
 * tags:
 *   name: Managers
 *   description: API for managing managers
 * 
 * /managers:
 *   post:
 *     summary: Create a new manager
 *     description: Add a new manager to the system.
 *     tags:
 *       - Managers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Manager created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       500:
 *         description: Failed to create manager
 * 
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const manager = await createManager(req.body);
    res.json(manager);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create manager' });
  }
});

/**
 * @swagger
 * tags:
 *   name: Managers
 *   description: API for managing managers
 * 
 * /managers/{id}:
 *   get:
 *     summary: Get a manager by ID
 *     description: Retrieve a manager by its ID.
 *     tags:
 *       - Managers
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The manager ID.
 *     responses:
 *       200:
 *         description: Manager found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       404:
 *         description: Manager not found
 *       500:
 *         description: Failed to fetch manager
 * 
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const manager = await getManagerById(Number(req.params.id));
    if (!manager) return res.status(404).send('Manager not found');
    res.json(manager);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch manager' });
  }
});

/**
 * @swagger
 * tags:
 *   name: Managers
 *   description: API for managing managers
 * 
 * /managers/{id}:
 *   put:
 *     summary: Update a manager
 *     description: Update an existing manager in the system.
 *     tags:
 *       - Managers
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The manager ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Manager updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       500:
 *         description: Failed to update manager
 * 
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const manager = await updateManager(Number(req.params.id), req.body);
    res.json(manager);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update manager' });
  }
});

/**
 * @swagger
 * tags:
 *   name: Managers
 *   description: API for managing managers
 * 
 * /managers/{id}:
 *   delete:
 *     summary: Delete a manager
 *     description: Delete a manager by its ID.
 *     tags:
 *       - Managers
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The manager ID.
 *     responses:
 *       200:
 *         description: Manager deleted
 *       500:
 *         description: Failed to delete manager
 * 
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await deleteManager(Number(req.params.id));
    res.send('Manager deleted');
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete manager' });
  }
});

export default router;
