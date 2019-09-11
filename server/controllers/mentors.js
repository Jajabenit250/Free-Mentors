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
  const mentorProfile = models.users.find(
    mentor => mentor.id == parseInt(id, 10) && mentor.role == 'mentor'
  );
  if (mentorProfile) {
    const hideMentorPassword = { ...mentorProfile };
    delete hideMentorPassword.password;
    response.response(res, 200, 200, hideMentorPassword);
  } else {
    response.response(res, 404, 404, 'No Mentor found', true);
  }
};

export default {
  listMentors,
  profileMentor
};
