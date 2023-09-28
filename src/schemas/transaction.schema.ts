import Joi from "joi";

const date = Joi.date();
const description = Joi.string().alphanum().min(4).max(50);
const amount = Joi.number();
const reference = Joi.string().alphanum().min(4).max(20);

const createTrasactionSchema = Joi.object({
  date: date.required(),
  description: description.required(),
  amount: amount.required(),
  reference: reference.required(),
});

const updateTransactionSchema = Joi.object({
  date: date,
  description: description,
  amount: amount,
  reference: reference,
});

export { createTrasactionSchema, updateTransactionSchema };