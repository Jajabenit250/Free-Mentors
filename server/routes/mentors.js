import { Router } from 'express';
import viewAllmentors from '../controllers/viewAllMentors';
import viewMentor from '../controllers/viewMentor';
import menteeChecker from '../middlewares/menteeChecker';
import authChecker from '../middlewares/authChecker';
const router = Router();
router.get(
  '/mentors',
  [authChecker.auth, menteeChecker.menteeChecker],
  viewAllmentors.listMentors
);
router.get(
  '/mentors/:id',
  [authChecker.auth, menteeChecker.menteeChecker],
  viewMentor.profileMentor
);

export default router;
