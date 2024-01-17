import express from "express";
import { ApartmentService } from "../services/apartments.service";
import { validatorHandler } from "../middlewares/validation.handler";
import { createApartmentSchema, getApartmentByIdSchema, updateApartmentSchema } from "../schemas/apartment.schema";
import passport from "passport";
import { UserFromToken } from "../types/auth.types";

const router = express.Router();
const service = new ApartmentService();

router.get("/", async (req, res, next) => {
  try {
    const rta = await service.findAll();
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/by-token",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user
      const rta = await service.findOne((user as UserFromToken).apt);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  validatorHandler(getApartmentByIdSchema, "params"),
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
  validatorHandler(createApartmentSchema, "body"),
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
  validatorHandler(getApartmentByIdSchema, "params"),
  validatorHandler(updateApartmentSchema, "body"),
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
  validatorHandler(getApartmentByIdSchema, "params"),
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
