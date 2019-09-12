import dotenv from 'dotenv';
import Client from '../config';
import { tables } from './tableQueries';

dotenv.config();
Client.connect();
// Run table queries
export const createTables = () => {
  const dataForTesting1 = `INSERT INTO users(email, firstName, lastName, password, birthdate, occupation, expertise, bio, phoneNumber, address, role, isAdmin) VALUES('byusa@gmail.com','Byusa', 'Dacy', '$2b$10$hwkOJznThaAoSN3KkntBFO7/BazavJU1BYh6lvemXa33/4t0.UAdu','12/5/1996', 'student','software', 'inspire the next', ' +250782314242', 'UMUSAVE', 'mentor', false)`;
  const dataForTesting2 = `INSERT INTO users(email, firstName, lastName, password, birthdate, occupation, expertise, bio, phoneNumber, address, role, isAdmin) VALUES('jaja@gmail.com','jaja', 'benit', '$2b$10$hwkOJznThaAoSN3KkntBFO7/BazavJU1BYh6lvemXa33/4t0.UAdu','12/5/1996', 'student','software', 'inspire the next', ' +250782314242', 'UMUSAVE', 'mentee', true)`;
  const dataForTesting3 = `INSERT INTO users(email, firstName, lastName, password, birthdate, occupation, expertise, bio, phoneNumber, address, role, isAdmin) VALUES('jeezy@gmail.com','Eric', 'Jeezy', '$2b$10$hwkOJznThaAoSN3KkntBFO7/BazavJU1BYh6lvemXa33/4t0.UAdu','12/5/1996', 'student','software', 'inspire the next', ' +250782314242', 'UMUSAVE', 'mentor', false)`;
  const dataForTesting4 = `INSERT INTO users(email, firstName, lastName, password, birthdate, occupation, expertise, bio, phoneNumber, address, role, isAdmin) VALUES('clau@gmail.com','Robert', 'Muhire', '$2b$10$hwkOJznThaAoSN3KkntBFO7/BazavJU1BYh6lvemXa33/4t0.UAdu','12/5/1996', 'student','software', 'inspire the next', ' +250782314242', 'UMUSAVE', 'mentee', false)`;
  const dataForTesting5 = `INSERT INTO users(email, firstName, lastName, password, birthdate, occupation, expertise, bio, phoneNumber, address, role, isAdmin) VALUES('thiery@gmail.com','Thierry', 'Byiringiro', '$2b$10$hwkOJznThaAoSN3KkntBFO7/BazavJU1BYh6lvemXa33/4t0.UAdu','12/5/1996', 'student','software', 'inspire the next', ' +250782314242', 'UMUSAVE', 'mentor', false)`;
  const dataForSession1 = `INSERT INTO sessions(mentorId, menteeId, questions, menteeEmail, status, score, menteeFullname, remark) VALUES ('1','2','Inspire me to be great','jaja@gmail.com','pending', 'no review yet', '', '')`;
  const dataForSession2 = `INSERT INTO sessions(mentorId, menteeId, questions, menteeEmail, status, score, menteeFullname, remark) VALUES ('1','4','Inspire me to be great','jaja@gmail.com','pending', 'no review yet', '', '')`;
  Client.query(tables)
    .then()
    .catch();
  Client.query(dataForTesting1)
    .then()
    .catch();
  Client.query(dataForTesting2)
    .then()
    .catch();
  Client.query(dataForTesting3)
    .then()
    .catch();
  Client.query(dataForTesting4)
    .then()
    .catch();
  Client.query(dataForTesting5)
    .then()
    .catch();
  Client.query(dataForSession1)
    .then()
    .catch();
  Client.query(dataForSession2)
    .then(() => {
      Client.end();
    })
    .catch();
};
//Delete them
export const tearDown = () => {
  const deleteQuery = 'DROP TABLE IF EXISTS users, sessions, reviews CASCADE';

  Client.query(deleteQuery)
    .then(() => {
      Client.end();
    })
    .catch();
};
require('make-runnable');
