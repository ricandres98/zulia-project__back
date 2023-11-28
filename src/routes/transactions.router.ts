import express from "express";
import { TransactionsService } from "../services/transactions.service";
import { validatorHandler } from "../middlewares/validation.handler";
import { createTransactionSchema, getTransactionByIdSchema, updateTransactionSchema } from "../schemas/transaction.schema";

const router = express.Router();
const service = new TransactionsService();

router.get("/", async (req, res, next) => {
  try {
    const rta = await service.findAll();
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await service.findOne(parseInt(id));
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validatorHandler(createTransactionSchema, "body"),
  async (req, res, next) => {
    try {
      // Crear nueva transacción
      const { body } = req;
      const rta = await service.create(body);

      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getTransactionByIdSchema, "params"),
  validatorHandler(updateTransactionSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
			const { body } = req;

			const rta = await service.update(parseInt(id), body);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getTransactionByIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(parseInt(id));
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
