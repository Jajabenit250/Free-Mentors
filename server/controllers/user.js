import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import validate from '../middlewares/signupValidator';
import models from '../models';
import express from 'express';
import response from '../helpers/response';
const router = express.Router();

// eslint-disable-next-line
const signUpUser = async (req, res) => {
  const { error } = validate(req.body);

  if (error)
    return response.response(
      res,
      422,
      'error',
      `${error.details[0].message}`,
      true
    );

  let user = await models.users.filter(
    user => user.email.toLowerCase() === req.body.email.toLowerCase()
  );
  if (user.length > 0) {
    return response.response(
      res,
      401,
      'error',
      'User with that email already registered',
      true
    );
  } else {
    const {
      firstName,
      lastName,
      email,
      password,
      birthdate,
      phoneNumber,
      address,
      occupation,
      expertise,
      bio
    } = req.body;
    // Add to object
    const addUser = {
      id: models.users.length + 1,
      firstName: firstName.toUpperCase(),
      lastName: lastName.toUpperCase(),
      email: email.toLowerCase(),
      password: password,
      phoneNumber: phoneNumber,
      birthdate: birthdate,
      occupation: occupation,
      expertise: expertise,
      bio: bio,
      address: address.toUpperCase(),
      role: 'mentree',
      isAdmin: false
    };
    const salt = await bcrypt.genSalt(10);
    addUser.password = await bcrypt.hash(addUser.password, salt);

    models.users.push(addUser);
    const hidepasscode = { ...addUser };
    delete hidepasscode.password;
    response.response(res, 201, 'success', hidepasscode, false);
  }
};

export default {
  signUpUser
};
