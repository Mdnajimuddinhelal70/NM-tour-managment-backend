import type { ITour } from "./tour.interface";
import { Tour } from "./tour.model";

const createTour = async (payload: ITour) => {
  const existingTour = await Tour.findOne({ title: payload.title });

  if (existingTour) {
    throw new Error("A Tour with this name already exists.");
  }

  const tour = await Tour.create(payload);
  return tour;
};

export const TourService = {
  createTour,
};
