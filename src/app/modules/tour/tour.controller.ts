import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
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

export const TourControler = {
  createTour,
};
