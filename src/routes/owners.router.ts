import express from "express";
import cors from "cors";
import { OwnerService } from "../services/owners.service";
import { validatorHandler } from "../middlewares/validation.handler";
import {
  checkOwnerExistsSchema,
  createOwnerSchema,
  getOwnerByIdSchema,
  getOwnerByPersonIdSchema,
  updateOwnerSchema,
} from "../schemas/owner.schema";
import passport from "passport";
import { UserFromToken } from "../types/auth.types";

const router = express.Router();
const service = new OwnerService();

router.options("/:id", cors());

router.get("/", async (req, res, next) => {
  try {
    const rta = await service.findAll();
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

router.get("/by-personId/:personId",
  validatorHandler(getOwnerByPersonIdSchema, "params"),
  async (req, res, next) => {
  try {
    const { personId } = req.params;
    console.log({personId});
    const rta = await service.findOneByPersonId(parseInt(personId));
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

router.get("/owner-exists/:personId",
  validatorHandler(checkOwnerExistsSchema, "params"),
  async (req, res, next) => {
  try {
    const { personId } = req.params;
    console.log({personId});
    const rta = await service.checkOwnerExists(parseInt(personId));
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/by-token",
  validatorHandler(getOwnerByIdSchema, "params"),
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = req.user;
      const rta = await service.findOne((user as UserFromToken).apt);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createOwnerSchema, "body"),
  // passport.authenticate("jwt", { session: false }),
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
  cors(),
  validatorHandler(getOwnerByIdSchema, "params"),
  validatorHandler(updateOwnerSchema, "body"),
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { body } = req;
      const user = req.user;
      const rta = await service.update((user as UserFromToken).apt, body);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getOwnerByIdSchema, "params"),
  passport.authenticate("jwt", { session: false }),
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
