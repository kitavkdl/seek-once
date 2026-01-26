// server/routes/userRoutes.js
import express from 'express';
import * as userService from '../services/userService.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

/**
 * GET /api/users/me
 * returns the logged-in user's app row (public.users) using auth_user_id
 */
router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const authUserId = req.authUser.id; // uuid from auth.users
    const user = await userService.getUserByAuthUserId(authUserId);

    if (!user) return res.status(404).json({ message: 'User row not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/users/me
 * updates logged-in user's app row (safe subset only)
 */
router.put('/me', requireAuth, async (req, res, next) => {
  try {
    const authUserId = req.authUser.id;
    const updated = await userService.updateMe(authUserId, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

/**
 * ADMIN routes (optional)
 * If you don't want admin functionality yet, delete everything below this line.
 */

// GET /api/users?school_id=...&major_id=...&minor_id=...
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const authUserId = req.authUser.id;

    // Admin-only
    const isAdmin = await userService.isAdmin(authUserId);
    if (!isAdmin) return res.status(403).json({ message: 'Forbidden' });

    const { school_id, major_id, minor_id } = req.query;

    const users = await userService.listUsers({
      school_id: school_id ? Number(school_id) : undefined,
      major_id: major_id ? Number(major_id) : undefined,
      minor_id: minor_id ? Number(minor_id) : undefined,
    });

    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:id  (admin-only)
router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const isAdmin = await userService.isAdmin(req.authUser.id);
    if (!isAdmin) return res.status(403).json({ message: 'Forbidden' });

    const user = await userService.getUser(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/:id  (admin-only)
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const isAdmin = await userService.isAdmin(req.authUser.id);
    if (!isAdmin) return res.status(403).json({ message: 'Forbidden' });

    const updated = await userService.updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/users/:id  (admin-only)
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const isAdmin = await userService.isAdmin(req.authUser.id);
    if (!isAdmin) return res.status(403).json({ message: 'Forbidden' });

    await userService.removeUser(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
