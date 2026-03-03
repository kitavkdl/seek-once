import express from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import * as ctrl from '../controllers/userCourseController.js';
console.log('✅ userCourseRoutes loaded');

const router = express.Router();

router.use(requireAuth);

router.post('/', ctrl.create);
router.get('/', ctrl.list);
router.patch('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

router.get('/test', (req, res) => {
  res.json({ ok: true });
}); //tesrt

export default router;
