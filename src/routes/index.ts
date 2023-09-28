import express, { Express } from "express";
import receiptsRouter from "./receipts.router";
import usersRouter from "./users.router";
import transactionRouter from "./transactions.router";

function apiRouter(app: Express) {
    const router = express.Router();
    
    app.use("/api/v1", router);
    router.use("/receipts", receiptsRouter);
    router.use("/users", usersRouter);
    router.use("/transactions", transactionRouter);
}

export { apiRouter };