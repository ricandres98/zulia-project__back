import Joi from "joi";

const email = Joi.string().email();

const validateEmailSchema = Joi.object({
  email: email.required(),
});


export {validateEmailSchema };
