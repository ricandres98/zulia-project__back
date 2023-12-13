import Joi  from "joi";

const id = Joi.number().integer().min(1);
const apartmentNumber = Joi.string().alphanum().min(1);
const aliquot = Joi.number();
const ownerId = Joi.number().integer().min(1);
const debt = Joi.number();

const createApartmentSchema = Joi.object({
	apartmentNumber: apartmentNumber.required(),
	aliquot: aliquot.required(),
	ownerId: ownerId.required(),
	debt: debt
});

const updateApartmentSchema = Joi.object({
	apartmentNumber: apartmentNumber,
	aliquot: aliquot,
	ownerId: ownerId,
	debt: debt
});

const getApartmentByIdSchema = Joi.object({
    id: id.required(),
});

export { createApartmentSchema, updateApartmentSchema, getApartmentByIdSchema };