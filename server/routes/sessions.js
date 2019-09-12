import { Router } from 'express';
import createSession from '../controllers/createSession';
import acceptSession from '../controllers/acceptSession';
import rejectSession from '../controllers/rejectSession';
import authChecker from '../middlewares/authChecker';
import mentorChecker from '../middlewares/mentorChecker';
const router = Router();
router.post('/sessions', [authChecker.auth], createSession.requestSession);
router.patch(
  '/sessions/:id/accept',
  [authChecker.auth, mentorChecker.mentorChecker],
  acceptSession.acceptSession
);
router.patch(
  '/sessions/:id/reject',
  [authChecker.auth, mentorChecker.mentorChecker],
  rejectSession.rejectSession
);
router.get('/sessions', (req, res) => {
  return res.send('all mentorship session requests');
});
router.post('/sessions/:id/review', (req, res) => {
  return res.send('Review a mentor after a mentorship session');
});
router.delete('/sessions/:id/review', (req, res) => {
  return res.send(
    'Admin can delete mentorship session review deemed inappropriate'
  );
});
export default router;
