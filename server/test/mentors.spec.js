import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mentors from '../controllers/mentors';
import users from '../models';
const should = chai.should();
chai.use(chaiHttp);
chai.should();

describe('GET /', () => {
  it('It should display all mentors ', done => {
    chai
      .request(app)
      .get('/api/v1/mentors')
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
