import { Router } from "express";
import { TourControler } from "./tour.controller";

const router = Router();

router.post("/create", TourControler.createTour);

export const TourRoutes = router;
