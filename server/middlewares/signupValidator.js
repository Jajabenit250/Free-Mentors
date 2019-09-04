import Joi from 'joi';
import { join } from 'path';

const signupValidator = user => {
  const schema = {
    lastName: Joi.string()
      .max(50)
      .required(),
    firstName: Joi.string()
      .max(50)
      .required(),
    birthdate: Joi.string()
      .max(50)
      .required(),
    occupation: Joi.string()
      .max(50)
      .required(),
    expertise: Joi.string()
      .max(50)
      .required(),
    bio: Joi.string()
      .min(40)
      .max(250)
      .required(),
    phoneNumber: Joi.string()
      .max(50)
      .required()
      .strict()
      .regex(/^[0-9]{0,10}$/),
    address: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(250)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(50)
      .required()
  };

  return Joi.validate(user, schema);
};
export default signupValidator;
