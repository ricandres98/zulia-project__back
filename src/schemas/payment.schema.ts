import Joi from "joi";

const id = Joi.number().integer().min(1);
const apartmentId = Joi.number().integer().min(1);
const transactionId = Joi.number().integer().min(1);

const createPaymentSchema = Joi.object({
  apartmentId: apartmentId.required(),
	transactionId: transactionId.required(),
});

const updatePaymentSchema = Joi.object({
	apartmentId: apartmentId,
	transactionId: transactionId
});

const getPaymentByIdSchema = Joi.object({
	id:id.required(),
});

export { createPaymentSchema, updatePaymentSchema, getPaymentByIdSchema };
