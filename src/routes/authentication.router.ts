import express from "express";
import { AuthenticationService } from "../services/authentication.service";
import { nextTick } from "process";
const router = express.Router();
const service = new AuthenticationService();

router.post("/", async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const rta = await service.getToken(username, password);
        res.json(rta);
    } catch(error) {
        next(error);
    }
});

export default router;