import express from 'express';
import * as minorService from '../services/minorService.js';

const router = express.Router();

// GET /api/minors
router.get('/', async (req, res, next) => {
  try {
    const minors = await minorService.listMinors();
    res.json(minors);
  } catch (err) {
    next(err); // let your global error handler deal with it
  }
});

// GET /api/minors/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const minor = await minorService.getMinor(id);

    if (!minor) {
      return res.status(404).json({ message: 'Minor not found' });
    }

    res.json(minor);
  } catch (err) {
    next(err);
  }
});

export default router;
