import express from "express";
import { ReceiptsService } from "../services/receipts.service";
import { validatorHandler } from "../middlewares/validation.handler";
import { createReceiptSchema, receiptIdSchema, updateReceiptSchema } from "../schemas/receipt.schema";
import passport from "passport";

const router = express.Router();
const service = new ReceiptsService();

router.get(
  "/",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    try {
      const rta = await service.findAll();
      res.json(rta);
      
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  validatorHandler(receiptIdSchema, "params"),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await service.findOne(parseInt(id));
    res.json(rta);
  } catch (error) {
    next(error)
  }
});

router.post(
  "/",
  validatorHandler(createReceiptSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newReceipt = await service.create(body);

      res.status(201).json(newReceipt);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(receiptIdSchema, "params"),
  validatorHandler(updateReceiptSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { id } =req.params;

      const updatedReceipt = await service.update(parseInt(id as string), body);

      res.json(updatedReceipt);
    } catch (error) {
      next(error)
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(receiptIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } =req.params;
      const rta = await service.delete(parseInt(id));

      res.json(rta);
    } catch (error) {
      next(error)
    }
  }
)

export default router;