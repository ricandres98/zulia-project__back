import Joi from "joi";

const id = Joi.number().integer();

const createReceiptSchema = Joi.object({
    periodId: id.required(),
    apartmentId: id.required(),
});

const updateReceiptSchema = Joi.object({
    periodId: id,
    apartmentId: id,
});

const receiptIdSchema = Joi.object({
    id: id.required(),
});

export { createReceiptSchema, updateReceiptSchema, receiptIdSchema };