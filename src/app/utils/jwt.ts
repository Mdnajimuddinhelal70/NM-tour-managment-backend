import type { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
export const genaerateToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn,
  } as SignOptions);
  return token;
};

export const verifyToken = (token: string, secret: string) => {
  const verifiedToken = jwt.sign(token, secret);
  return verifiedToken;
};
