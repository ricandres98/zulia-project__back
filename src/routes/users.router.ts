import express from "express";
import { UsersService } from "../services/users.service";
import { validatorHandler } from "../middlewares/validation.handler";
import { createUserSchema, updateUserSchema } from "../schemas/users.schema";
import { getTransactionByIdSchema } from "../schemas/transaction.schema";

const router = express.Router();

const service = new UsersService();

router.get("/", async(req, res, next) => {
  try {
    const rta = service.findAll();
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id", 
  validatorHandler(getTransactionByIdSchema, "params"),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const rta = await service.findById(parseInt(id));
    res.json(rta);
  } catch(err) {
		next(err);
  }
});

router.post("/", 
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
  try {
    const { body } = req;

    const rta = await service.createNewUser(body);

    res.json(rta);

  } catch (error) {
    next(error)
  }
});

router.patch("/:id",
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const rta = await service.updateById(parseInt(id), body);
      
      res.json(rta);

    } catch (error) {
      next(error);  
    }
});


export default router;
