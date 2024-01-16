import jwt from "jsonwebtoken";

type IData = {
  id: string;
};

const SECRET_KEY = process.env.JWT_SECRET_KEY || "default";

export const createToken = (data: IData) => {
  return jwt.sign(data, SECRET_KEY);
};

export const verifyToken = (token: string) => {
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return "ERROR_LOGIN";
    }

    return decoded;
  });
};
