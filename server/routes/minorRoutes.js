const express = require('express');
const router = express.Router();
const minorService = require('../services/minorService'); 

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
      return res.status(404).json({ message: 'Major not found' });
    }

    res.json(minor);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
