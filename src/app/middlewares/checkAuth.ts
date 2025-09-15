/* eslint-disable no-console */
import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import type { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
export const checkAuth =
  (...authRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(httpStatus.UNAUTHORIZED, "No Token Recieved");
      }

      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as unknown as JwtPayload;
      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You are not permited to viwe this route!"
        );
      }
      next();
    } catch (error) {
      console.log(error);
    }
  };
