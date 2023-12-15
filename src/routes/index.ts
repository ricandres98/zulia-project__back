import express, { Express } from "express";
import receiptsRouter from "./receipts.router";
import usersRouter from "./users.router";
import transactionRouter from "./transactions.router";
import periodRouter from "./periods.router";
import ownerRouter from "./owners.router";
import apartmentRouter from "./apartments.router";
import paymentRouter from "./payments.router";
import authRouter from "./auth.router";

function apiRouter(app: Express) {
  const router = express.Router();

  app.use("/api/v1", router);
  router.use("/receipts", receiptsRouter);
  router.use("/users", usersRouter);
  router.use("/transactions", transactionRouter);
  router.use("/periods", periodRouter);
  router.use("/owners", ownerRouter);
  router.use("/apartments", apartmentRouter);
  router.use("/payments", paymentRouter);
  router.use("/auth", authRouter);
}

export { apiRouter };
