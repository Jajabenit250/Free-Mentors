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

const allSessions = async (req, res) => {
  const allSession = await client.query(
    `SELECT * FROM sessions WHERE menteeId=$1`,
    [req.user.id,]
  );
  if (allSession.rows.length > 0) {
    response.response(res, 200, 200, 'All User Session', allSession.rows);
  }
  else {
    response.response(res, 404, 404, 'No Session found', true);
  }
};
export default {
  allSessions
}
