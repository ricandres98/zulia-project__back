import express from "express";
import { UsersService } from "../services/users.service";
import { validatorHandler } from "../middlewares/validation.handler";
import {
  createUserSchema,
  getUserByIdSchema,
  updateUserSchema,
} from "../schemas/users.schema";

const router = express.Router();

const service = new UsersService();

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
  validatorHandler(getUserByIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.findOne(parseInt(id));
      res.json(rta);
    } catch (err) {
      next(err);
    }
  }
);


router.post(
  "/",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const rta = await service.create(body);
      res.status(201).json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getUserByIdSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
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
  validatorHandler(getUserByIdSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(parseInt(id));
      res.json(rta);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
