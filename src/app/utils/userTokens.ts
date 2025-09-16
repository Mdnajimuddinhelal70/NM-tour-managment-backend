import { envVars } from "../config/env";
import type { IUser } from "../modules/user/user.interface";
import { genaerateToken } from "./jwt";

export const createUserTokens = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user?._id,
    email: user?.email,
    role: user?.role,
  };

  // Generated from utils/jwt
  const accessToken = genaerateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  const refreshToken = genaerateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES
  );

  return {
    accessToken,
    refreshToken,
  };
};
