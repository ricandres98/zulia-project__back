import express from "express";
import { UsersService } from "../services/users.service";

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

export default router;
