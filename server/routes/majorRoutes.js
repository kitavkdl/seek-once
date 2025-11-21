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

module.exports = router;
