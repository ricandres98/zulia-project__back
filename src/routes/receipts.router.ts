import express from "express";
import { ReceiptsService } from "../services/receipts.service";
import { validatorHandler } from "../middlewares/validation.handler";
import { createReceiptSchema, receiptIdSchema, updateReceiptSchema } from "../schemas/receipt.schema";
import passport from "passport";
import { UserFromToken } from "../types/auth.types";

const router = express.Router();
const service = new ReceiptsService();

router.get(
  "/",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const rta = await service.findAll((user as UserFromToken).apt);
      res.json(rta);
      
    } catch (error) {
      next(error);
    }
  }
  );
  
router.get(
  "/:id",
  validatorHandler(receiptIdSchema, "params"),
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = req.user;
      const rta = await service.findOne(parseInt(id), (user as UserFromToken).apt);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

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
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { id } =req.params;
      const user = req.user;

      const updatedReceipt = await service.update(parseInt(id as string), body, (user as UserFromToken).apt);

      res.json(updatedReceipt);
    } catch (error) {
      next(error)
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(receiptIdSchema, "params"),
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { id } =req.params;
      const user = req.user;

      const rta = await service.delete(parseInt(id), (user as UserFromToken).apt);

      res.json(rta);
    } catch (error) {
      next(error)
    }
  }
)

export default router;