import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import signinValidator from '../middlewares/signinValidator';
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
const signInUser = async (req, res) => {
  const { password } = req.body;
  // ###validate userlogin
  const { error } = signinValidator(req.body);
  if (error)
    return response.response(
      res,
      422,
      422,
      'check your body input',
      `${error.details[0].message}`,
      true
    );
  let emailCheck = await client.query('SELECT * FROM users WHERE email=$1', [
    req.body.email.toLowerCase(),
  ]);

  if (emailCheck.rows.length > 0) {
    if (bcrypt.compareSync(password, emailCheck.rows[0].password)) {
      const token = jwt.sign(
        {
          id: emailCheck.rows[0].id,
          isAdmin: emailCheck.rows[0].isadmin,
          role: emailCheck.rows[0].role,
          email: emailCheck.rows[0].email,
          firstName: emailCheck.rows[0].firstname,
          lastName: emailCheck.rows[0].lastname
        },
        process.env.JWT
      );
      {
        const {
          firstname,
          lastname,
          email,
          phonenumber,
          address,
          role,
          isadmin
        } = emailCheck.rows[0];

        const responses = {
          firstname,
          lastname,
          email,
          phonenumber,
          address,
          role,
          isadmin,
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
      return response.response(
        res,
        401,
        401,
        'error',
        'Invalid user or password',
        true
      );
    }
  } else {
    return response.response(
      res,
      401,
      401,
      'error',
      'Invalid user or password',
      true
    );
  }
};
export default {
  signInUser
};
