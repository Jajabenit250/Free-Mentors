import response from '../helpers/response';
import users from '../models';

module.exports = function(req, res, next) {
  if (!req.user.isAdmin)
    return response.response(
      res,
      401,
      401,
      'You dont have a permission to perform this action',
      true
    );

  next();
};
