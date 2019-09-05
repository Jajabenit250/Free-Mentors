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

export default {
  listMentors
};
