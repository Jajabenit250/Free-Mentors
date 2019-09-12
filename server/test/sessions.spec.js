import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import jwt from 'jsonwebtoken';
import createSession from '../controllers/createSession';
import acceptSession from '../controllers/acceptSession';
import rejectSession from '../controllers/rejectSession';
const should = chai.should();
chai.use(chaiHttp);
chai.should();

describe('POST /', () => {
  it('New sessions, it should return 201', done => {
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
      role: 'mentee',
      isAdmin: true
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    const session = {
      mentorId: '1',
      question: 'Inspire me to be great in everything i do'
    };

    chai
      .request(app)
      .post('/api/v1/sessions')
      .set('token', Token)
      .send(session)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

  it('question should not be empty', done => {
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
      role: 'mentee',
      isAdmin: true
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    const session = {
      mentorId: '6',
      menteeId: '7',
      question: ''
    };

    chai
      .request(app)
      .post('/api/v1/sessions')
      .set('token', Token)
      .send(session)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        done();
      });
  });
});

describe('PATCH /', () => {
  it('It should accept session if mentor ', done => {
    const Signed = {
      id: 1,
      email: 'byusa@gmail.com',
      firstName: 'Niyonsenga',
      lastName: 'Eric',
      birthdate: '555211',
      occupation: 'student',
      expertise: 'ehjkk,',
      bio: 'akkkk',
      phoneNumber: '0789769787',
      address: 'Kacyiru',
      role: 'mentor',
      isAdmin: true
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .patch('/api/v1/sessions/1/accept')
      .set('token', Token)
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('It should return error if session not found', done => {
    const Signed = {
      id: 1,
      email: 'byusa@gmail.com',
      firstName: 'Havugimana',
      lastName: 'Benit',
      birthdate: '555211',
      occupation: 'student',
      expertise: 'ehjkk,',
      bio: 'akkkk',
      phoneNumber: '0789769787',
      address: 'Kacyiru',
      role: 'mentor',
      isAdmin: true
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .patch('/api/v1/sessions/5/accept')
      .set('token', Token)
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('It should return 401 if you are not mentor ', done => {
    const Signed = {
      id: 4,
      email: 'clau@gmail.com',
      firstName: 'BYUSA',
      lastName: 'PRINCE DACY',
      birthdate: '555211',
      occupation: 'student',
      expertise: 'ehjkk,',
      bio: 'akkkk',
      phoneNumber: ' +250782314242',
      address: 'UMUSAVE',
      role: 'mentee',
      isAdmin: false
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .patch('/api/v1/sessions/1/accept')
      .set('token', Token)
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
});

describe('PATCH /', () => {
  it('It should reject session if mentor ', done => {
    const Signed = {
      id: 1,
      email: 'byusa@gmail.com',
      firstName: 'Niyonsenga',
      lastName: 'Eric',
      birthdate: '555211',
      occupation: 'student',
      expertise: 'ehjkk,',
      bio: 'akkkk',
      phoneNumber: '0789769787',
      address: 'Kacyiru',
      role: 'mentor',
      isAdmin: true
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .patch('/api/v1/sessions/2/reject')
      .set('token', Token)
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('It should return error if session not found', done => {
    const Signed = {
      id: 1,
      email: 'byusa@gmail.com',
      firstName: 'Havugimana',
      lastName: 'Benit',
      birthdate: '555211',
      occupation: 'student',
      expertise: 'ehjkk,',
      bio: 'akkkk',
      phoneNumber: '0789769787',
      address: 'Kacyiru',
      role: 'mentor',
      isAdmin: true
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .patch('/api/v1/sessions/5/reject')
      .set('token', Token)
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('It should return 401 if you are not mentor ', done => {
    const Signed = {
      id: 4,
      email: 'clau@gmail.com',
      firstName: 'BYUSA',
      lastName: 'PRINCE DACY',
      birthdate: '555211',
      occupation: 'student',
      expertise: 'ehjkk,',
      bio: 'akkkk',
      phoneNumber: ' +250782314242',
      address: 'UMUSAVE',
      role: 'mentee',
      isAdmin: false
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .patch('/api/v1/sessions/1/reject')
      .set('token', Token)
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
});
