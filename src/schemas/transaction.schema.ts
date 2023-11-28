import { CssSpace } from "@faker-js/faker";
import Joi from "joi";

const date = Joi.date();
const description = Joi.string().min(4).max(50);
const amount = Joi.number();
const reference = Joi.string().alphanum().min(4).max(20);
const id = Joi.number().min(1).integer();

const createTransactionSchema = Joi.object({
  date: date.required(),
  description: description.required(),
  amount: amount.required(),
  reference: reference.required(),
  period_id: id,
});

const updateTransactionSchema = Joi.object({
  date: date,
  description: description,
  amount: amount,
  reference: reference,
});

const getTransactionByIdSchema = Joi.object({
  id: id.required(),
})

export { createTransactionSchema, updateTransactionSchema, getTransactionByIdSchema };