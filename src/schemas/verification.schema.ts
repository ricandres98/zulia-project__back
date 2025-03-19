import Joi from "joi";

const email = Joi.string().email();
const code = Joi.string().alphanum().length(6);

const verifyEmailSchema = Joi.object({
  email: email.required(),
});

const verifyCodeSchema = Joi.object({
  email: email.required(),
  code: code.required(),
});


export { verifyEmailSchema, verifyCodeSchema};
