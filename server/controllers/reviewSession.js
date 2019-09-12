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
const reviewSession = async (req, res) => {
  const { id } = req.params;
  const checkSession = await client.query(
    `SELECT * FROM sessions WHERE id=$1 AND menteeId=$2`,
    [id, req.user.id,]
  );
  if (checkSession.rows.length > 0){
    const firstname = req.user.firstName;
    const lastname = req.user.lastName;
    const menteeFullname = firstname + " " + lastname;
    const {
      score
    } = req.body;
    const defaultRemark = 'pending';
    const updateStatus = client.query('UPDATE sessions SET score=$1, menteeFullname=$2, remark=$3 where id = $4', [
      score,
      menteeFullname,
      defaultRemark,
      id,
    ]);
     const updatedSession = await client.query(
    `SELECT * FROM sessions WHERE id=$1 AND menteeId=$2`,
    [id, req.user.id,]
  );
    response.response(res, 200, 200, 'User Add review to a session', updatedSession.rows[0]);
  }
  else {
    response.response(res, 404, 404, 'No Session found', true);
  }
};
export default {
  reviewSession
}
