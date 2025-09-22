import { globalEerrorHandler } from "./app/middlewares/globalerrorHandle";

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Request, type Response } from "express";
import expressSession from "express-session";
import passport from "passport";
import { envVars } from "./app/config/env";
import "./app/config/passport"; //!For passport
import { notFound } from "./app/middlewares/notFound";
import { router } from "./app/routes";

const app = express();

app.use(
  expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
); //!For passport
app.use(passport.initialize()); //!For passport
app.use(passport.session()); //!For passport
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
