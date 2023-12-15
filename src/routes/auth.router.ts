import express from "express";
import passport from "passport";
import { AuthService } from "../services/auth.service";
import { UserWithFields } from "../types/auth.types";

const router = express.Router();
const service = new AuthService();

router.post(
	"/login",
	passport.authenticate("local", { session: false }), 
	async (req, res, next) => {
	try {
		const user = req.user;
		const rta = await service.signToken(user as UserWithFields)
		res.json(rta);
	} catch (error) {
		next(error);
	}
});

export default router;
