import response from '../helpers/response';
import users from '../models';

const menteeChecker = (req, res, next) => {
  if (req.user.role != 'mentee')
    return response.response(
      res,
      401,
      401,
      'you are not a mentee',
      'You dont have a permission to perform this action',
      true
    );

  next();
};
export default {
  menteeChecker
};
