// server/routes/userRoutes.js
import express from 'express';
import * as userService from '../services/userService.js';

const router = express.Router();

// GET /api/users?school=...&major_id=...&minor_id=...
router.get('/', async (req, res, next) => {
  try {
    const { school, major_id, minor_id } = req.query;

    const users = await userService.listUsers({
      school,
      major_id: major_id ? Number(major_id) : undefined,
      minor_id: minor_id ? Number(minor_id) : undefined,
    });

    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// POST /api/users
router.post('/', async (req, res, next) => {
  try {
    const { school, major_id, minor_id, cum_gpa, enrolled_semester } = req.body;

    if (!school || !enrolled_semester) {
      return res
        .status(400)
        .json({ message: 'school and enrolled_semester are required' });
    }

    const created = await userService.createUser({
      school,
      major_id: major_id ?? null,
      minor_id: minor_id ?? null,
      cum_gpa: cum_gpa ?? 0.0,
      enrolled_semester,
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/:id
router.put('/:id', async (req, res, next) => {
  try {
    const updatePayload = req.body;
    const updated = await userService.updateUser(req.params.id, updatePayload);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await userService.removeUser(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
