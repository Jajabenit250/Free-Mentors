import { Router } from 'express';
import user from '../controllers/user';
const router = Router();

router.post('/auth/signup', user.signUpUser);
router.post('/auth/signin', (req, res) => {
  return res.send('Users can sign in.');
});
router.patch('/user/:id', (req, res) => {
  return res.send('Admin can change a user to a mentor');
});
export default router;
