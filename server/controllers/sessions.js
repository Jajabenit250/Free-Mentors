import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import models from '../models';
import response from '../helpers/response';
import validate from '../middlewares/sessionsValidator';

const router = express.Router();

const requestSession = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return response.response(
      res,
      422,
      422,
      `${error.details[0].message}`,
      true
    );
  const sessionfinder = await models.sessions.filter(
    (sessionfinder => sessionfinder.mentorId === req.body.mentorId) &&
      (sessionfinder => sessionfinder.menteeId === req.user.id)
  );
  if (sessionfinder.length > 0) {
    return response.response(res, 401, 401, 'Session already requested', true);
  } else {
    const { mentorId, menteeEmail, question } = req.body;
    const mentorPro = models.users.find(
      usr => usr.id == parseInt(mentorId, 10) && usr.role == 'mentor'
    );
    if (mentorPro) {
      const addSession = {
        id: models.sessions.length + 1,
        mentorId: mentorId,
        menteeId: req.user.id,
        menteeEmail: menteeEmail,
        question: question,
        status: 'pending'
      };

      models.sessions.push(addSession);
      const addedSession = { ...addSession };
      response.response(res, 201, 201, addedSession, false);
    }
  }
};
const acceptSession = async (req, res) => {
  const { id } = req.params;
  const session = models.sessions.find(
    session => session.id === parseInt(id, 10)
  );
  if (session) {
    session.status = 'accepted';
    response.response(res, 200, 200, session);
  } else {
    response.response(res, 404, 404, 'No Session found', true);
  }
};
const rejectSession = async (req, res) => {
  const { id } = req.params;
  const sessionf = models.sessions.find(
    usession => usession.id === parseInt(id, 10)
  );
  if (sessionf) {
    sessionf.status = 'rejected';
    response.response(res, 200, 200, sessionf);
  } else {
    response.response(res, 404, 404, 'No Session found', true);
  }
};
export default {
  requestSession,
  acceptSession,
  rejectSession
};
