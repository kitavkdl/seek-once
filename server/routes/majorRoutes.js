import express from 'express';
import * as majorService from '../services/majorService.js';

const router = express.Router();

// GET /api/majors
router.get('/', async (req, res, next) => {
  try {
    const majors = await majorService.listMajors();
    res.json(majors);
  } catch (err) {
    next(err);
  }
});

// GET /api/majors/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const major = await majorService.getMajor(id);

    if (!major) {
      return res.status(404).json({ message: 'Major not found' });
    }

    res.json(major);
  } catch (err) {
    next(err);
  }
});

// POST /api/majors
router.post('/', async (req, res, next) => {
  try {
    const { dept, major_name, specialization } = req.body;

    if (!dept || !major_name) {
      return res.status(400).json({
        message: 'dept and major_name are required',
      });
    }

    const created = await majorService.createMajor({
      dept,
      major_name,
      specialization: specialization || null,
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

export default router;
