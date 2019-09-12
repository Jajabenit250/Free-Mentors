import { Router } from 'express';
import signUp from '../controllers/signUp';
import signIn from '../controllers/signIn';
import userToMentor from '../controllers/userToMentor';
import authChecker from '../middlewares/authChecker';
import adminChecker from '../middlewares/adminChecker';
const router = Router();

router.post('/auth/signup', signUp.signUpUser);
router.post('/auth/signin', signIn.signInUser);
router.patch(
  '/user/:id',
  [authChecker.auth, adminChecker.adminChecker],
  userToMentor.userTomentor
);
export default router;
