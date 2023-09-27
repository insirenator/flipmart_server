import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import authRouter from "./routers/auth.router";

interface CustomError extends Error {
  status: number;
  msg: string;
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/auth", authRouter);

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res
    .status(err.status || 500)
    .json({ success: false, error: err.msg || err });
});

export default app;
