import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import jwt from 'jsonwebtoken';
import viewAllmentors from '../controllers/viewAllMentors';
import viewMentor from '../controllers/viewMentor';
const should = chai.should();
chai.use(chaiHttp);
chai.should();

describe('GET /', () => {
  it('It should display all mentors ', done => {
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
      isAdmin: false
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .get('/api/v1/mentors')
      .set('token', Token)
      .send()
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it('It should display a specific mentor ', done => {
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
      isAdmin: false
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .get('/api/v1/mentors/1')
      .set('token', Token)
      .send()
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it('It should not return mentor if there is no mentor found with specific id', done => {
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
    chai
      .request(app)
      .get('/api/v1/mentors/10')
      .set('token', Token)
      .send()
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });
});
