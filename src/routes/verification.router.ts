import express from "express";
import { validatorHandler } from "../middlewares/validation.handler";
import { verifyCodeSchema, verifyEmailSchema } from "../schemas/verification.schema";
import { VerificationService } from "../services/verification.service";

const router = express.Router();
const service = new VerificationService();

router.post(
	"/verify-email",
	validatorHandler(verifyEmailSchema, "body"),
	async (req, res, next) => {
		try {
			const body = req.body;
			const rta = await service.verifyEmail(body);
			if (rta) {
				res.status(200).json({
					message: "Code sent"
				});
			} else {
				res.status(400).json({
					message: "An error ocurred"
				});
			}
		} catch (error) {
			next(error);
		}
	});

router.post(
	"/verify-code",
	validatorHandler(verifyCodeSchema, "body"),
	async (req, res, next) => {
		try {
			const body = req.body;
			const rta = await service.verifyCode(body);
			if (rta.status) {
				res.status(200).json({ message: rta.message });
			} else {
				res.status(400).json({ message: rta.message })
			}
		} catch (error) {
			next(error);
		}
	});

export default router;
