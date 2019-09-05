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
  const userId = models.users.find(
    usr => usr.id == parseInt(id, 10) && usr.role == 'mentor'
  );
  if (userId) {
    response.response(res, 200, 200, userId);
  } else {
    response.response(res, 404, 404, true);
  }
};

export default {
  listMentors,
  profileMentor
};
