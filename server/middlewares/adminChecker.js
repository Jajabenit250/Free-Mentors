import response from '../helpers/response';
import users from '../models';

const adminChecker = (req, res, next) => {
  if (!req.user.isAdmin)
    return response.response(
      res,
      401,
      401,
      'you are not an admin',
      'You dont have a permission to perform this action',
      true
    );

  next();
};
export default {
  adminChecker
};
