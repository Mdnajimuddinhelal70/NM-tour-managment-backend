/* eslint-disable no-console */
import type { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { User } from "./user.model";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });

    res.status(httpStatus.CREATED).json({
      message: "User created succesfully",
      data: user,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
    });
    console.log(error);
  }
};

export const UserController = {
  createUser,
};
