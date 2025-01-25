import Joi  from "joi";

const id = Joi.number().integer().min(1);
const name = Joi.string().alphanum().min(1).max(15);
const personId = Joi.number().integer().min(1000000);

const createOwnerSchema = Joi.object({
    firstName: name.required(),
    middleName: name,
    lastName: name.required(),
    secondLastName: name,
    personId: personId.required()
});

const updateOwnerSchema = Joi.object({
    firstName: name,
    middleName: name,
    lastName: name,
    secondLastName: name,
    personId: personId
});

const getOwnerByIdSchema = Joi.object({
    id: id.required(),
});

const getOwnerByPersonIdSchema = Joi.object({
    personId: id.required(),
});

const checkOwnerExistsSchema = Joi.object({
    personId: personId.required(),
});

export { getOwnerByPersonIdSchema, createOwnerSchema, updateOwnerSchema, getOwnerByIdSchema, checkOwnerExistsSchema };