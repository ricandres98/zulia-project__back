import express from "express";
import { ReceiptsService } from "../services/receipts.service";
const router = express.Router();
const service = new ReceiptsService();

router.get("/", (req, res) => {
  const rta = service.findAll();
  res.json(rta);

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

router.get("/:id", async (req, res, next) => {
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

export default router;