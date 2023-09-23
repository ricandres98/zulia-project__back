import express, { Express } from "express";
import receiptsRouter from "./receipts.router";
import usersRouter from "./users.router";
import authRouter from "./authentication.router";

function apiRouter(app: Express) {
    const router = express.Router();

    app.use("/api/v1", router);
    router.use("/receipts", receiptsRouter);
    router.use("/users", usersRouter);
    router.use("/auth", authRouter);
}

export { apiRouter };