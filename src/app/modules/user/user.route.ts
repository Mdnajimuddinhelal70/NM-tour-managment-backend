import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { Role } from "./user.interface";
import { createUserZodSchema } from "./user.validation";

const route = Router();

route.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserController.createUser
);
route.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  UserController.getAllUsers
);

route.patch(
  "/:id",
  // validateRequest(createUserZodSchema),
  checkAuth(...Object.values(Role)),
  UserController.updateUser
);
export const UserRoutes = route;
