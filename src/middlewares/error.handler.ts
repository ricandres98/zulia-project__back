import { ErrorRequestHandler } from "express";
import { ForeignKeyConstraintError, ValidationError } from "sequelize";

const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.error("LOG_ERRORS");
  console.error(err);
  next(err);
};

const handleErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.error("HANDLE_ERRORS");
  if (err) {
    res.send(new Error(err.message));
  } else {
    next(err);
  }
};

const handleBoom: ErrorRequestHandler = (err, req, res, next) => {
  console.error("HANDLE_BOOM");
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
};

const sequelizeErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if(err instanceof ValidationError) {
    console.error("HANDLE_SEQUELIZE_ERROR");
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  } else if(err instanceof ForeignKeyConstraintError) {
    res.status(409).json({
      statusCode: 409,
      message: err.message,
      errors: err.original
    })
  } else {
    next(err);
  }
}

export { logErrors, handleErrors, handleBoom, sequelizeErrorHandler };
