import { Router } from 'express';

const router = Router();
router.post('/auth/signup', (req, res) => {
  return res.send('Users can sign up');
});
router.post('/auth/signin', (req, res) => {
  return res.send('Users can sign in.');
});
router.patch('/user/:id', (req, res) => {
  return res.send('Admin can change a user to a mentor');
});
export default router;
