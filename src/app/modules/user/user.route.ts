import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { createUserZodSchema } from "./user.validation";

const route = Router();

route.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserController.createUser
);
route.get("/all-users", UserController.getAllUsers);

export const UserRoutes = route;
