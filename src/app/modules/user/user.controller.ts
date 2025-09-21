/* eslint-disable @typescript-eslint/no-unused-vars */
import { catchAsync } from "./../../utils/catchAsync";

import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Created successfully!",
      data: user,
    });
  }
);

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id as string;

    const verifiedToken = req.user;
    if (!verifiedToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Token not found");
    }
    const payload = req.body;
    const user = await UserServices.updateUser(userId, payload, verifiedToken);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Updated successfully!",
      data: user,
    });
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All Users Retrived Successfully!",
      data: result.data,
      meta: result.meta,
    });
  }
);

export const UserController = {
  createUser,
  getAllUsers,
  updateUser,
};
