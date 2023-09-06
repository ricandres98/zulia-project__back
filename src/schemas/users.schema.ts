import Joi from "joi";

const name = Joi.string().alphanum().min(3).max(15);

const updateUserSchema = Joi.object({
    firstName: name,
    lastName: name,
});

export { updateUserSchema };
