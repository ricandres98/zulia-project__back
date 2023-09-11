import Joi from "joi";

const name = Joi.string().alphanum().min(3).max(15);
const email = Joi.string().email();
const apartment = Joi.string().alphanum().min(2).max(4);

const updateUserSchema = Joi.object({
    firstName: name,
    lastName: name,
});

const createUserSchema = Joi.object({
    firstName: name.required(),
    lastName: name.required(),
    username:name.required(),
    email: email.required(),
    apartment: apartment.required(),
    residence: name.required()
});

export { updateUserSchema, createUserSchema };
