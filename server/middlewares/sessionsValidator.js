import Joi from 'joi';
import { join } from 'path';

const sessionsValidator = user => {
  const schema = {
    mentorId: Joi.string()
      .max(50)
      .required(),
    question: Joi.string()
      .max(50)
      .required(),
    mentreeEmail: Joi.string()
      .min(5)
      .max(250)
      .required()
      .email()
  };

  return Joi.validate(user, schema);
};
export default sessionsValidator;
