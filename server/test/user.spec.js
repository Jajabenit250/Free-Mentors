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
      address: 'Kacyiru',
      isAdmin: true
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
      address: 'Kabuga',
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
        expect(res.statusCode).to.equal(401);
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

// test for Sign In

describe('POST /', () => {
  it('it should return 401 for Invalid user or password', done => {
    const user = {
      email: 'benith@gmail.com',
      password: '12345678six'
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });

  it('it should return 401 for Invalid user or password', done => {
    const user = {
      email: 'user8@gmail.com',
      password: '12345six'
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });

  it('it should return 401 for Invalid user or password', done => {
    const user = {
      email: 'user8@gmail.com',
      password: '123456six'
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });

  it('it should return 200 if the username match with the password', done => {
    const user = {
      email: 'newuser@gmail.com',
      password: '12345six'
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it(' it should return 422 for invalid email and password', done => {
    const user = {
      email: '',
      password: ''
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        done();
      });
  });

  it('it should return 422 for invalid email ', done => {
    const user = {
      email: '',
      password: '3456six'
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        done();
      });
  });
});

// test Change User to mentor

describe('PATCH /', () => {
  it('It should cancel a user to mentor request if admin ', done => {
    const Signed = {
      id: 6,
      email: 'newuser@gmail.com',
      firstName: 'Niyonsenga',
      lastName: 'Eric',
      birthdate: '555211',
      occupation: 'student',
      expertise: 'ehjkk,',
      bio: 'akkkk',
      phoneNumber: '0789769787',
      address: 'Kacyiru',
      isAdmin: true
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .patch('/api/v1/user/1')
      .set('token', Token)
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('It should return User not Found! if a user does not exist ', done => {
    const Signed = {
      id: 6,
      email: 'newuser@gmail.com',
      firstName: 'Niyonsenga',
      lastName: 'Eric',
      birthdate: '555211',
      occupation: 'student',
      expertise: 'ehjkk,',
      bio: 'akkkk',
      phoneNumber: '0789769787',
      address: 'Kacyiru',
      isAdmin: true
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .patch('/api/v1/user/20')
      .set('token', Token)
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('It should return 401 if you are not admin ', done => {
    const Signed = {
      id: 1,
      email: 'byusa@gmail.com',
      firstName: 'BYUSA',
      lastName: 'PRINCE DACY',
      birthdate: '555211',
      occupation: 'student',
      expertise: 'ehjkk,',
      bio: 'akkkk',
      phoneNumber: ' +250782314242',
      address: 'UMUSAVE',
      isAdmin: false
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .patch('/api/v1/user/1')
      .set('token', Token)
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
});
