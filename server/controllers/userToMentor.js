import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';
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

// eslint-disable-next-line
const userTomentor = async (req, res) => {
  const { id } = req.params;
  const userId = await client.query('SELECT * FROM users WHERE id=$1', [id,]);
  if (userId.rows.length > 0) {
    const { role } = userId.rows[0];
    const newrole = 'mentor';
    const updateRole = client.query('UPDATE users SET role=$1 where id = $2', [
      newrole,
      id,
    ]);
    return response.response(
      res,
      200,
      200,
      'User account changed to mentor',
      false
    );
  } else {
    return response.response(res, 404, 404, 'error', 'User not Found!', true);
  }
};

export default {
  userTomentor
};
