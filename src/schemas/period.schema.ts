import Joi  from "joi";

const month = Joi.number().integer().min(0).max(11);
const year = Joi.number().integer().min(2000);
const id = Joi.number().integer().min(1);

const createPeriodSchema = Joi.object({
    month: month.required(),
    year: year.required()
});

const updatePeriodSchema = Joi.object({
    month: month,
    year: year
});

const getPeriodByIdSchema = Joi.object({
    id: id.required(),
})

export { createPeriodSchema, updatePeriodSchema, getPeriodByIdSchema };