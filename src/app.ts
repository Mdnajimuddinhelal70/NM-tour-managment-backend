import cors from "cors";
import express, { type Request, type Response } from "express";
import { router } from "./app/routes";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcomee to Nm Tour Managment.",
  });
});
export default app;
