import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import validate from '../middlewares/signupValidator';
import signinValidator from '../middlewares/signinValidator';
import models from '../models';
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

  let usermail = await client.query('SELECT * FROM users WHERE email=$1 ', [
    req.body.email.toLowerCase()
  ]);
  if (usermail.rows.length > 0) {
    return response.response(
      res,
      401,
      401,
      'User with that email already registered',
      true
    );
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        let newpassword = hash;
        let admin = 'false';
        if (req.body.email == process.env.administrator) {
          admin = 'true';
        }
        const {
          email,
          firstName,
          lastName,
          phoneNumber,
          address,
          birthdate,
          expertise,
          occupation,
          bio
        } = req.body;
        const defaultRole = 'mentee';
        const recordUser = client.query(
          'INSERT INTO users(email, firstname, lastname, password, phonenumber, address, birthdate, expertise, occupation, bio, role, isadmin)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',
          [
            email.toLowerCase(),
            firstName,
            lastName,
            newpassword,
            phoneNumber,
            address,
            birthdate,
            expertise,
            occupation,
            bio,
            defaultRole,
            admin
          ]
        );

        if (recordUser) {
          let getId = await client.query(
            'SELECT * FROM users WHERE email=$1 ',
            [req.body.email.toLowerCase()]
          );
          const toBeSigned = {
            id: getId.rows[0].id,
            role: 'mentee',
            isAdmin: false
          };
          jwt.sign(toBeSigned, JWT, { expiresIn: '24h' }, (err, token) => {
            const {
              email,
              firstName,
              lastName,
              phoneNumber,
              address,
              birthdate,
              expertise,
              occupation,
              bio
            } = req.body;
            const payload = {
              email,
              firstName,
              lastName,
              phoneNumber,
              address,
              birthdate,
              expertise,
              occupation,
              bio,
              token
            };
            return response.response(
              res,
              201,
              201,
              'User completely added',
              payload,
              false
            );
          });
        }
      });
    });
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
  let emailCheck = await client.query('SELECT * FROM users WHERE email=$1', [
    req.body.email.toLowerCase()
  ]);

  if (emailCheck.rows.length > 0) {
    if (bcrypt.compareSync(password, emailCheck.rows[0].password)) {
      const token = jwt.sign(
        {
          id: emailCheck.rows[0].id,
          isAdmin: emailCheck.rows[0].isAdmin,
          role: emailCheck.rows[0].role,
          email: emailCheck.rows[0].email
        },
        process.env.JWT
      );
      {
        const {
          firstName,
          lastName,
          email,
          phoneNumber,
          address
        } = emailCheck.rows[0];

        const responses = {
          firstName,
          lastName,
          email,
          phoneNumber,
          address,
          token
        };

        return response.response(
          res,
          200,
          200,
          'user succesfully signIn',
          responses,
          false
        );
      }
    } else {
      return response.response(res, 401, 401, 'Invalid user or password', true);
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
