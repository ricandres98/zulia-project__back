import express from "express";
import { ReceiptsService } from "../services/receipts.service";
import { validatorHandler } from "../middlewares/validation.handler";
import { createReceiptSchema, receiptIdSchema, updateReceiptSchema } from "../schemas/receipt.schema";

const router = express.Router();
const service = new ReceiptsService();

router.get("/", async (req, res, next) => {
  try {
    const rta = await service.findAll();
    res.json(rta);
    
  } catch (error) {
    next(error);
  }
  
    // res.json([
    //   {
    //     date: "20/06/2023",
    //     month: "agosto",
    //     year: 2023,
    //   },
    //   {
    //     date: "20/06/2023",
    //     month: "agosto",
    //     year: 2023,
    //   },
    //   {
    //     date: "20/06/2023",
    //     month: "agostino",
    //     year: 2023,
    //   },
    // ]);
});

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
  // res.json({
  //   receiptId: id,
  //   property: "A9",
  //   owner: "Ricardo Ojeda",
  //   billedMonth: "mayo",
  //   year: 2023,
  //   aliquot: 3.7643,
  //   owedAmount: 217.28,
  //   expenses: [
  //     {
  //       description:
  //         "Previsión bono alimenticio trabajador residencial según decreto",
  //       amount: 1000,
  //     },
  //     {
  //       description: "CANTV Conserjería",
  //       amount: 1260.34,
  //     },
  //     {
  //       description: "Hidrocapitalito junio",
  //       amount: 2116.32,
  //     },
  //   ],
  // });
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