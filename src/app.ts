import express, { type Request, type Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcomee to Nm Tour Managment.",
  });
});
export default app;
