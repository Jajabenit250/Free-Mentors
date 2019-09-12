import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import response from '../helpers/response';
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

const rejectSession = async (req, res) => {
  const { id } = req.params;
  const session = await client.query(
    `SELECT * FROM sessions WHERE id=$1 AND mentorId=$2`,
    [id, req.user.id,]
  );
  if (session.rows.length > 0) {
    const sessionStatus = await client.query(
      `SELECT * FROM sessions WHERE status='pending'`
    );
    if (sessionStatus.rows.length > 0) {
    const newStatus = 'rejected';
    const updateStatus = client.query('UPDATE sessions SET status=$1 where id = $2', [
      newStatus,
      id,
    ]);
    const sessionRejected = await client.query(
    `SELECT * FROM sessions WHERE id=$1 AND mentorId=$2`,
    [id, req.user.id,]
  );
      response.response(
        res,
        200,
        200,
        'Successsfully accepted',
        sessionRejected.rows[0]
      );
    } else {
      response.response(
        res,
        404,
        404,
        'action already taken',
        sessionStatus.rows[0]
      );
    }
  } else {
    response.response(res, 404, 404, 'No Session found', true);
  }
};
export default {
  rejectSession
};
