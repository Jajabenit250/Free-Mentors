import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import express from 'express';
import response from '../helpers/response';
import models from '../models';
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
  if (searchMentors.rows.length > 0) {
    response.response(res, 200, 200, 'List of all Mentors', searchMentors.rows);
  }
};
const profileMentor = async (req, res) => {
  const { id } = req.params;
  let mentorProfile = await client.query(
    `SELECT * FROM users WHERE id=$1 AND role='mentor'`,
    [id]
  );
  if (mentorProfile.rows.length > 0) {
    const hideMentorPassword = { ...mentorProfile };
    delete hideMentorPassword.password;
    response.response(res, 200, 200, 'Specific mentor', hideMentorPassword);
  } else {
    response.response(res, 404, 404, 'error', 'No Mentor found', true);
  }
};

export default {
  listMentors,
  profileMentor
};
