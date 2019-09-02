import { Router } from 'express';
const router = Router();
router.get('/mentors', (req, res) => {
  return res.send('Users can view mentors.');
});
router.get('/mentors/:mentorId', (req, res) => {
  return res.send('Users can view a specific mentor.');
});

export default router;
