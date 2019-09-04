import Joi from 'joi';

const signinValidator = user => {
  const schema = {
    email: Joi.string()
      .max(250)
      .trim()
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  };

  return Joi.validate(user, schema);
};
export default signinValidator;
