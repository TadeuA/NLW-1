import express from "express";
import path from "path";
import cors from "cors";
import { isCelebrate } from "celebrate";

import routes from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "..", "uploads", "stores"))
);

const errorHandling = (err: any, req: any, res: any, next: any) => {
  if (isCelebrate(err)) {
    const { joi } = err;
    const keys = joi.details.map((key: any) => {
      return key.context.key;
    });
    return res.send({
      statusCode: 400,
      message: err.joi.message,
      validation: keys,
    });
  }

  return next(err);
};
app.use(routes);
app.use(errorHandling);
app.listen(3333);
