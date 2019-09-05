import { Router } from 'express';
import mentors from '../controllers/mentors';
const router = Router();
router.get('/mentors', mentors.listMentors);
router.get('/mentors/:id', mentors.profileMentor);

export default router;
