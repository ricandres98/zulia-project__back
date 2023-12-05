import express, { Express } from "express";
import receiptsRouter from "./receipts.router";
import usersRouter from "./users.router";
import transactionRouter from "./transactions.router";
import periodRouter from "./periods.router";
import ownerRouter from "./owners.router";

function apiRouter(app: Express) {
    const router = express.Router();
    
    app.use("/api/v1", router);
    router.use("/receipts", receiptsRouter);
    router.use("/users", usersRouter);
    router.use("/transactions", transactionRouter);
    router.use("/periods", periodRouter);
    router.use("/owners", ownerRouter);
}

export { apiRouter };