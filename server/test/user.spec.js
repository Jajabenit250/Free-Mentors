import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import jwt from 'jsonwebtoken';
import user from '../controllers/user';
import users from '../models';
const should = chai.should();
chai.use(chaiHttp);
chai.should();

// test for Sign Up
describe('POST /', () => {
  it('New user, it should return 201', done => {
    const user = {
      email: 'newuser@gmail.com',
      firstName: 'Byiringiro',
      lastName: 'Thierry',
      password: '12345six',
      birthdate: '555211',
      occupation: 'student',
      expertise: 'ehjkk,',
      bio:
        'more life as user i want to improve in life sector i want to move forward days by days and i truly beileve that i will meet new peoples to help me',
      phoneNumber: '0789769787',
      address: 'Kacyiru'
    };

    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

  it('should register non already registered user', done => {
    const user = {
      email: 'benith@gmail.com',
      firstName: 'havugimana',
      lastName: 'Benith',
      password: '12345six',
      birthdate: '555211',
      occupation: 'student',
      expertise: 'ehjkk,',
      bio:
        'more life as user i want to improve in life sector i want to move forward days by days and i truly beileve that i will meet new peoples to help me',
      phoneNumber: '0784524569',
      address: 'Kabuga'
    };

    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

  it('should not register already taken email', done => {
    const user = {
      email: 'newuser@gmail.com',
      firstName: 'Rwema',
      lastName: 'kalisa',
      password: '65432six',
      birthdate: '555211',
      occupation: 'student',
      expertise: 'ehjkk,',
      bio:
        'more life as user i want to improve in life sector i want to move forward days by days and i truly beileve that i will meet new peoples to help me',
      phoneNumber: '0789837734',
      address: 'Kibungo'
    };

    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        done();
      });
  });

  it('should not register 405 if the provided method is not allowed', done => {
    const user = {
      email: 'newuser@gmail.com',
      firstName: 'Rwema',
      lastName: 'kalisa',
      password: '65432six',
      birthdate: '555211',
      occupation: 'student',
      expertise: 'ehjkk,',
      bio:
        'more life as user i want to improve in life sector i want to move forward days by days and i truly beileve that i will meet new peoples to help me',
      phoneNumber: '0789837734',
      address: 'Kibungo'
    };

    chai
      .request(app)
      .delete('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(405);
        done();
      });
  });

  it('email should not be empty', done => {
    const user = {
      email: '',
      firstName: 'Mugabo',
      lastName: 'Evode',
      password: '123456six',
      birthdate: '555211',
      occupation: 'student',
      expertise: 'ehjkk,',
      bio:
        'more life as user i want to improve in life sector i want to move forward days by days and i truly beileve that i will meet new peoples to help me',
      phoneNumber: '0785634779',
      address: 'Kicukiro'
    };

    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        done();
      });
  });
});
