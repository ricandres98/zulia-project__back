import express from "express";
import { UsersService } from "../services/users.service";
import { validatorHandler } from "../middlewares/validation.handler";
import { updateUserSchema } from "../schemas/users.schema";

const router = express.Router();

const service = new UsersService();

router.get("/", (req, res) => {
  const rta = service.findAll();
  res.json(rta);
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const rta = await service.findById(parseInt(id));
    res.json(rta);
  } catch(err) {
		next(err);
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
})

export default router;
