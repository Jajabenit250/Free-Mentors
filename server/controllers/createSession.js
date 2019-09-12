import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import response from '../helpers/response';
import validate from '../middlewares/sessionsValidator';
import { Client, Pool } from 'pg';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();
const { JWT } = process.env;
const { DATABASE_URL } = process.env;
const connectionString = DATABASE_URL;
const client = new Client({
  connectionString
});
client.connect();

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
  const sessionfinder = await client.query(
    `SELECT * FROM sessions WHERE mentorId=$1 AND menteeId=$2`,
    [req.body.mentorId, req.user.id,]
  );
  if (sessionfinder.rows.length > 0) {
    return response.response(
      res,
      401,
      401,
      'error',
      'Session already requested',
      true
    );
  } else {
    const { mentorId } = req.body;
    const mentorPro = await client.query(
      `SELECT * FROM users WHERE id=$1 AND role='mentor'`,
      [mentorId,]
    );
    if (mentorPro.rows.length > 0) {
      const { mentorId, question } = req.body;
      const defaultStatus = 'pending';
      const recordUser = client.query(
        'INSERT INTO sessions(mentorId, menteeId, questions, menteeEmail, status)VALUES($1,$2,$3,$4,$5)',
        [mentorId, req.user.id, question, req.user.email, defaultStatus,]
      );
      const menteeEmail = req.user.email;
      const menteeId = req.user.id;
      const addedSession = {
        mentorId,
        menteeId,
        question,
        menteeEmail,
        defaultStatus
      };
      response.response(
        res,
        201,
        201,
        'session successfully added',
        addedSession,
        false
      );
    }
  }
};
export default {
  requestSession
};
