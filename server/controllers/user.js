import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import validate from '../middlewares/signupValidator';
import signinValidator from '../middlewares/signinValidator';
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
      422,
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
      401,
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
      role: 'mentee',
      isAdmin: false
    };
    const salt = await bcrypt.genSalt(10);
    addUser.password = await bcrypt.hash(addUser.password, salt);

    models.users.push(addUser);
    const hidepasscode = { ...addUser };
    delete hidepasscode.password;
    response.response(res, 201, 201, hidepasscode, false);
  }
};
const signInUser = async (req, res) => {
  const { password } = req.body;
  // ###validate userlogin
  const { error } = signinValidator(req.body);
  if (error)
    return response.response(
      res,
      422,
      422,
      `${error.details[0].message}`,
      true
    );

  const user = await models.users.filter(
    user => user.email.toLowerCase() === req.body.email.toLowerCase()
  );
  if (user.length > 0) {
    if (bcrypt.compareSync(password, user[0].password)) {
      const token = jwt.sign(
        { id: user[0].id, isAdmin: user[0].isAdmin },
        process.env.JWT
      );
      {
        const responses = {
          firstname: user[0].firstName,
          lastname: user[0].lastName,
          email: user[0].email,
          token
        };

        return response.response(
          res,
          200,
          200,
          { token: responses.token },
          false
        );
      }
    } else {
      return response.response(res, 401, 401, 'Invalid password', true);
    }
  } else {
    return response.response(res, 401, 401, 'Invalid user or password', true);
  }
};
const userTomentor = async (req, res) => {
  const { id } = req.params;
  const userId = models.users.findIndex(usr => usr.id === parseInt(id, 10));
  if (userId >= 0) {
    models.users[userId].role = 'mentor';
    return response.response(
      res,
      200,
      200,
      'User account changed to mentor',
      false
    );
  } else {
    return response.response(res, 404, 404, 'User not Found!', true);
  }
};

export default {
  signUpUser,
  signInUser,
  userTomentor
};
