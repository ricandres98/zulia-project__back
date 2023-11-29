import express from "express";
import { PeriodService } from "../services/periods.service";
import { validatorHandler } from "../middlewares/validation.handler";
import { createPeriodSchema, getPeriodByIdSchema } from "../schemas/period.schema";

const router = express.Router();
const service = new PeriodService();

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
  validatorHandler(getPeriodByIdSchema, "params"),
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
  
router.post(
  "/",
  validatorHandler(createPeriodSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const rta = await service.create(data);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);
  
router.patch(
  "/:id",
  validatorHandler(getPeriodByIdSchema, "params"),
  validatorHandler(createPeriodSchema, "body"),
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
  validatorHandler(getPeriodByIdSchema, "params"),
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
