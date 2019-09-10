import { Router } from 'express';
import mentors from '../controllers/mentors';
import menteeChecker from '../middlewares/menteeChecker';
import authChecker from '../middlewares/authChecker';
const router = Router();
router.get('/mentors', [authChecker, menteeChecker], mentors.listMentors);
router.get('/mentors/:id', [authChecker, menteeChecker], mentors.profileMentor);

export default router;
