import { Router } from "express";
import { UserController } from "./user.controller";

const route = Router();

route.post("/register", UserController.createUser);
route.get("/all-users", UserController.getAllUsers);

export const UserRoutes = route;
