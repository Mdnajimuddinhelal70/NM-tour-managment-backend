/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";

export const globalEerrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorSources: any = [
    //   {
    //   path: "isDeleted",
    //   message: "Cast Failed"
    // }
  ];
  let statusCode = 500;
  let message = "Something went wrong";

  // if (err.code === 11000) {
  //   console.log("Duplicate error", err.message);
  //   const duplicate = err.message.match(/"([^"]*)"/);
  //   statusCode = 400;
  //   message = `${duplicate?.[1]} already exists!!`;

  // }
  // ! Step one  already exists!!
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field as keyof typeof err.keyValue];
    message = `${field}: ${value} already exists!!`;
  }
  //!  Step Two CastError
  else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid MongoDB ObjectID. Please provide a valid id";
  } else if (err.name === "ZodError") {
    statusCode = 400;
    message = "Zod Error";
    console.log(err.issues);
  }

  // Mongoose Validation error
  //!  Step Three  ValidationError
  else if (err.name === "ValidationError") {
    statusCode = 400;
    const errors = Object.values(err.errors);

    errors.forEach((errorObject: any) =>
      errorSources.push({
        path: errorObject.path,
        message: errorObject.message,
      })
    );
    message = "Validation Error";
  }
  //!  Step Four
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  //!  Step Five
  else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }
  // ! Step Six
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
