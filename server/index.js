import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import user from './routes/user';
import mentors from './routes/mentors';
import sessions from './routes/sessions';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', user);
app.use('/api/v1', mentors);
app.use('/api/v1', sessions);

// catch 405
app.use((req, res, next) => {
  const error = new Error('Method not allowed');
  error.status = 405;
  next(error);
});
//catch 500
app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .send({ status: error.status || 500, error: error.message });
  next();
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is Running on port ${PORT}!!`);
});

export default app;
