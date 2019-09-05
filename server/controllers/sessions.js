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
  const session = await models.sessions.filter(
    (session => session.mentorId === req.body.mentorId) &&
      (session => session.mentreeId === req.user.id)
  );
  if (session.length > 0) {
    return response.response(res, 401, 401, 'Session already requested', true);
  } else {
    const { mentorId, mentreeEmail, question } = req.body;
    const mentorPro = models.users.find(
      usr => usr.id == parseInt(mentorId, 10) && usr.role == 'mentor'
    );
    if (mentorPro) {
      const addSession = {
        id: models.sessions.length + 1,
        mentorId: mentorId,
        mentreeId: req.user.id,
        mentreeEmail: mentreeEmail,
        question: question,
        status: 'pending'
      };

      models.sessions.push(addSession);
      const addedSession = { ...addSession };
      response.response(res, 201, 201, addedSession, false);
    }
  }
};
export default {
  requestSession
};
