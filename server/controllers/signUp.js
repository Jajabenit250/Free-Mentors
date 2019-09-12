import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import validate from '../middlewares/signupValidator';
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
      'check your body input',
      `${error.details[0].message}`,
      true
    );

  let usermail = await client.query('SELECT * FROM users WHERE email=$1 ', [
    req.body.email.toLowerCase(),
  ]);
  if (usermail.rows.length > 0) {
    return response.response(
      res,
      401,
      401,
      'error',
      'User with that email already registered',
      true
    );
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        let newpassword = hash;
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
        const admin = false;
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
            [req.body.email.toLowerCase(),]
          );
          const toBeSigned = {
            id: getId.rows[0].id,
            role: getId.rows[0].role,
            isAdmin: getId.rows[0].isadmin
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
export default {
  signUpUser
};
