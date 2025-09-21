import { globalEerrorHandler } from "./app/middlewares/globalerrorHandle";

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Request, type Response } from "express";
import expressSession from "express-session";
import passport from "passport";
import { notFound } from "./app/middlewares/notFound";
import { router } from "./app/routes";

const app = express();

app.use(
  expressSession({
    secret: "Your secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcomee to Nm Tour Managment.",
  });
});

app.use(globalEerrorHandler);
app.use(notFound);
export default app;
