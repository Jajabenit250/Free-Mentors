import jwt from 'jsonwebtoken';
import response from '../helpers/response';

module.exports = function auth(req, res, next) {
  const token = req.header('token');
  if (!token) {
    return response.response(
      res,
      401,
      401,
      'Access denied. no token provided.',
      true
    );
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = decoded;

    next();
  } catch (ex) {
    return response.response(res, 401, 401, 'invalid token.', true);
  }
};
