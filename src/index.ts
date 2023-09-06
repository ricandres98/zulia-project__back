import express from "express";
import { apiRouter } from "./routes";
import cors from "cors";
import { handleBoom, handleErrors, logErrors } from "./middlewares/error.handler";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json())

app.listen(port, () => {
  console.log("corriendo en el puerto ", port);
});

apiRouter(app);
app.use(logErrors);
app.use(handleBoom);
app.use(handleErrors);
