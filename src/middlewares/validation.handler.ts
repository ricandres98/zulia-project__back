import { RequestHandler } from "express";
import boom from "@hapi/boom";
import Joi from "joi";

const validatorHandler = (
  schema: Joi.Schema,
  property: "body" | "params" | "query"
): RequestHandler => {

  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      next(boom.badRequest(error));
    } else {
      next();
    }
  };
};

export { validatorHandler };