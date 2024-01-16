import bcrypt from "bcrypt";
const salts: number = 10;

export const encrypt = (password: string): string => {
  return bcrypt.hashSync(password, salts);
};

export const compare = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};
