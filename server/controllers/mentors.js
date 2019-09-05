import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import express from 'express';
import response from '../helpers/response';
import models from '../models';
const router = express.Router();

const listMentors = async (req, res) => {
  const searchMentors = models.users.filter(sts => sts.role === 'mentor');
  if (searchMentors) {
    response.response(res, 200, 200, searchMentors);
  }
};
const profileMentor = async (req, res) => {
  const { id } = req.params;
  const mentorProfile = models.users.find(
    mentor => mentor.id == parseInt(id, 10) && mentor.role == 'mentor'
  );
  if (mentorProfile) {
    response.response(res, 200, 200, mentorProfile);
  } else {
    response.response(res, 404, 404, 'No Mentor found', true);
  }
};

export default {
  listMentors,
  profileMentor
};
