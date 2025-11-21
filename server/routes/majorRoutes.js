// majorRoutes.js
const express = require('express');
const router = express.Router();
const majorService = require('../services/majorService'); // adjust path

// GET /api/majors
router.get('/majors', async (req, res, next) => {
  try {
    const majors = await majorService.listMajors();
    res.json(majors);
  } catch (err) {
    next(err); // let your global error handler deal with it
  }
});

// GET /api/majors/:id
router.get('/majors/:id', async (req, res, next) => {
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
// body: { "dept": "...", "major_name": "...", "specialization": "..." }
router.post('/', async (req, res, next) => {
  try {
    const { dept, major_name, specialization } = req.body;

    // quick required-field check
    if (!dept || !major_name) {
      return res
        .status(400)
        .json({ message: 'dept and major_name are required' });
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

module.exports = router;
