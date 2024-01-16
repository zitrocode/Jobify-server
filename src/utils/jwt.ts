import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "default";

export type ISession = {
  id: string;
  username: string;
};

export const generateToken = (data: ISession) => {
  return jwt.sign(data, SECRET_KEY, { expiresIn: "24h" });
};

export const compareToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, SECRET_KEY);
};
