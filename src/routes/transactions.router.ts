import express from "express";
import { TransactionsService } from "../services/transactions.service";
import { validatorHandler } from "../middlewares/validation.handler";
import { createTrasactionSchema, updateTransactionSchema } from "../schemas/transaction.schema";

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

router.post(
  "/",
  validatorHandler(createTrasactionSchema, "body"),
  async (req, res, next) => {
    try {
      // Crear nueva transacción
      const { body } = req;
      const rta = await service.createNewTransaction(body);

      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(updateTransactionSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
			const { body } = req;

			const rta = await service.updateTransaction(parseInt(id), body);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
