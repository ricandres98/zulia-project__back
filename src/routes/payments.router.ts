import express from "express";
import { PaymentService } from "../services/payments.service";
import { createPaymentSchema, getPaymentByIdSchema, updatePaymentSchema } from "../schemas/payment.schema";
import { validatorHandler } from "../middlewares/validation.handler";

const router = express.Router();
const service = new PaymentService();

router.get("/", async (req, res, next) => {
  try {
    const rta = await service.findAll();
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getPaymentByIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.findOne(parseInt(id));
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

// router.post(
//   "/",
//   validatorHandler(createPaymentSchema, "body"),
//   async (req, res, next) => {
//     try {
//       const { body } = req;
//       const rta = await service.create(body);
//       res.json(rta);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.patch(
//   "/:id",
//   validatorHandler(getPaymentByIdSchema, "params"),
//   validatorHandler(updatePaymentSchema, "body"),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const { body } = req;
//       const rta = await service.update(parseInt(id), body);
//       res.json(rta);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

router.delete(
  "/:id",
  validatorHandler(getPaymentByIdSchema, "params"),
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