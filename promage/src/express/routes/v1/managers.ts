import express from 'express';
import {
  getAllManagers,
  createManager,
  getManagerById,
  updateManager,
  deleteManager,
} from '../../../services/manager.service';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const managers = await getAllManagers();
    res.json(managers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch managers' });
  }
});

router.post('/', async (req, res) => {
  try {
    const manager = await createManager(req.body);
    res.json(manager);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create manager' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const manager = await getManagerById(Number(req.params.id));
    if (!manager) return res.status(404).send('Manager not found');
    res.json(manager);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch manager' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const manager = await updateManager(Number(req.params.id), req.body);
    res.json(manager);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update manager' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deleteManager(Number(req.params.id));
    res.send('Manager deleted');
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete manager' });
  }
});

export default router;
