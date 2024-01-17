import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

export type ISession = {
  id: string;
};

export const createAccessToken = (data: ISession) => {
  return jwt.sign(data, config.jwtSecret, { expiresIn: "24h" });
};

export const compareToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, config.jwtSecret);
};
