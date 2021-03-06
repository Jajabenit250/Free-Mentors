import jwt from 'jsonwebtoken';
import response from '../helpers/response';

const auth = (req, res, next) => {
  const token = req.header('token');
  if (!token) {
    return response.response(
      res,
      401,
      401,
      'Check your header',
      'Access denied. no token provided.',
      true
    );
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = decoded;

    next();
  } catch (ex) {
    return response.response(
      res,
      401,
      401,
      'Check your header',
      'invalid token.',
      true
    );
  }
};
export default {
  auth
};
