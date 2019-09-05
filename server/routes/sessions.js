import { Router } from 'express';
import sessions from '../controllers/sessions';
import authChecker from '../middlewares/authChecker';
const router = Router();
router.post('/sessions', [authChecker], sessions.requestSession);
router.patch('/sessions/:sessionId/accept', (req, res) => {
  return res.send('accept mentorship session');
});
router.patch('/sessions/:sessionId/reject', (req, res) => {
  return res.send('reject mentorship session');
});
router.get('/sessions', (req, res) => {
  return res.send('all mentorship session requests');
});
router.post('/sessions/:sessionId/review', (req, res) => {
  return res.send('Review a mentor after a mentorship session');
});
router.delete('/sessions/:sessionId/review', (req, res) => {
  return res.send(
    'Admin can delete mentorship session review deemed inappropriate'
  );
});
export default router;
