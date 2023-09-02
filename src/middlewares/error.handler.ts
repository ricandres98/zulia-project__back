import { ErrorRequestHandler } from "express";

const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  next(err);
};

const handleErrors: ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    res.send(new Error(err.message));
  } else {
    next(err);
  }
};

const handleBoom: ErrorRequestHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
};

export { logErrors, handleErrors, handleBoom };
