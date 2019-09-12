import Joi from 'joi';
import { join } from 'path';

const sessionsValidator = user => {
  const schema = {
    mentorId: Joi.string()
      .max(50)
      .required(),
    question: Joi.string()
      .max(50)
      .required()
  };

  return Joi.validate(user, schema);
};
export default sessionsValidator;
