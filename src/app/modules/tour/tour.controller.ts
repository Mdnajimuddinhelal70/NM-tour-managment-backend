import type { Request, Response } from "express";
import AppError from "../../errorHelpers/AppError";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "./../../utils/catchAsync";
import { TourService } from "./tour.service";

const createTour = catchAsync(async (req: Request, res: Response) => {
  const result = await TourService.createTour(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Tour created successfully,",
    data: result,
  });
});

const getAllTours = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await TourService.getAllTours(query as Record<string, string>);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tours retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleTour = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  if (!slug) {
    throw new AppError(400, "Slug is required!");
  }
  const result = await TourService.getSingleTour(slug);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour retrieved successfully",
    data: result,
  });
});

export const TourControler = {
  createTour,
  getAllTours,
  getSingleTour,
};
