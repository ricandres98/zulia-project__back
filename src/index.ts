import express from "express";
import { apiRouter } from "./routes";
import { handleBoom, handleErrors, logErrors, sequelizeErrorHandler } from "./middlewares/error.handler";
import { config } from "./config/config";
import cors from "cors";
import "./utils/auth";

const app = express();
const port = config.port || 8000;

app.options("*", cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.listen(port, () => {
  console.log("corriendo en el puerto ", port);
});

apiRouter(app);
app.use(logErrors);
app.use(sequelizeErrorHandler);
app.use(handleBoom);
app.use(handleErrors);
