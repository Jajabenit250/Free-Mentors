import { Router } from 'express';
import user from '../controllers/user';
import authChecker from '../middlewares/authChecker';
import adminChecker from '../middlewares/adminChecker';
const router = Router();

router.post('/auth/signup', user.signUpUser);
router.post('/auth/signin', user.signInUser);
router.patch(
  '/user/:id',
  [authChecker.auth, adminChecker.adminChecker],
  user.userTomentor
);
export default router;
