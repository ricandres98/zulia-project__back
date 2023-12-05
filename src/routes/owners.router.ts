import express from "express";
import { OwnerService } from "../services/owners.service";
import { validatorHandler } from "../middlewares/validation.handler";
import {
  createOwnerSchema,
  getOwnerByIdSchema,
  updateOwnerSchema,
} from "../schemas/owner.schema";

const router = express.Router();
const service = new OwnerService();

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
  validatorHandler(getOwnerByIdSchema, "params"),
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
  validatorHandler(createOwnerSchema, "body"),
  async (req, res, next) => {
    try {
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
  validatorHandler(getOwnerByIdSchema, "params"),
  validatorHandler(updateOwnerSchema, "body"),
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
  validatorHandler(getOwnerByIdSchema, "params"),
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
