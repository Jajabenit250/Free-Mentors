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

const listMentors = async (req, res) => {
  let searchMentors = await client.query(
    `SELECT * FROM users WHERE role='mentor'`
  );
  let hidepassword = [];
  let lenM = searchMentors.rows.length;
  while (lenM > 0) {
    const hidePass = { ...searchMentors.rows[lenM - 1] };
    delete hidePass.password;
    lenM--;
    hidepassword = hidepassword.concat(hidePass);
  }
  if (searchMentors.rows.length > 0) {
    response.response(res, 200, 200, 'List of all Mentors', hidepassword);
  }
};
export default {
  listMentors
};
