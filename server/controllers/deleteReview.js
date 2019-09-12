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
const delReviewSession = async (req, res) => {
  // create logic to check if admin and then check session review remark if pending delete review update remark to deleted
  const { id } = req.params;
  const checkSession = await client.query(
    `SELECT * FROM sessions WHERE id=$1 AND remark='pending'`,
    [id,]
  );
  if (checkSession.rows.length > 0){
    const newScore = '';
    const newRemark = 'deleted';
    const deleteReview = client.query('UPDATE sessions SET score=$1, remark=$2 where id=$3', [
      newScore,
      newRemark,
      id,
    ]);
    response.response(res, 200, 200, 'Review deleted successfully')
  }
  else {
    response.response(res, 404, 404, 'No Session found', true);
  }
};
export default {
  delReviewSession
}
