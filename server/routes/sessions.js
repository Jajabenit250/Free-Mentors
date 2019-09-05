import { Router } from 'express';
import sessions from '../controllers/sessions';
import authChecker from '../middlewares/authChecker';
import mentorChecker from '../middlewares/mentorChecker';
const router = Router();
router.post('/sessions', [authChecker], sessions.requestSession);
router.patch(
  '/sessions/:id/accept',
  [authChecker, mentorChecker],
  sessions.acceptSession
);
router.patch(
  '/sessions/:id/reject',
  [authChecker, mentorChecker],
  sessions.rejectSession
);
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
