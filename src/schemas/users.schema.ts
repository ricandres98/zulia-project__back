import Joi from "joi";

const email = Joi.string().email();
const password = Joi.string().min(8);
const apartmentId = Joi.number().integer().min(1);
const id = Joi.number().integer().min(1)

const updateUserSchema = Joi.object({
	password: password.required()
});

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  apartmentId: apartmentId.required(),
});

const getUserByIdSchema = Joi.object({
	id: id.required(),
})

export { updateUserSchema, createUserSchema, getUserByIdSchema };
