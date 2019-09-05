import { Router } from 'express';
import mentors from '../controllers/mentors';
const router = Router();
router.get('/mentors', mentors.listMentors);
router.get('/mentors/:mentorId', (req, res) => {
  return res.send('Users can view a specific mentor.');
});

export default router;
