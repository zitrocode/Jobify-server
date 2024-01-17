import dotenv from "dotenv";
dotenv.config();

interface IConfig {
  port: number;
  jwtSecret: string;
  database: {
    username: string;
    password: string;
    uri: string;
  };
}

const config: IConfig = {
  port: Number(process.env["PORT"]) as number,
  jwtSecret: process.env["JWT_SECRET"] as string,
  database: {
    username: process.env["MONGO_USERNAME"] as string,
    password: process.env["MONGO_PASSWORD"] as string,
    uri: process.env["MONGO_URI"] as string,
  },
};

export default config;
