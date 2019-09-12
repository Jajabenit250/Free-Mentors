import { Router } from 'express';
import createSession from '../controllers/createSession';
import acceptSession from '../controllers/acceptSession';
import rejectSession from '../controllers/rejectSession';
import allUserSession from '../controllers/allUserSessions';
import reviewSession from '../controllers/reviewSession';
import deleteReview from '../controllers/deleteReview';
import authChecker from '../middlewares/authChecker';
import mentorChecker from '../middlewares/mentorChecker';
import menteeChecker from '../middlewares/menteeChecker';
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
router.get('/sessions', [authChecker.auth, menteeChecker.menteeChecker], allUserSession.allSessions);
router.post('/sessions/:id/review', (req, res) => {
  return res.send('Review a mentor after a mentorship session');
});
router.delete('/sessions/:id/review', (req, res) => {
  return res.send(
    'Admin can delete mentorship session review deemed inappropriate'
  );
});
export default router;
