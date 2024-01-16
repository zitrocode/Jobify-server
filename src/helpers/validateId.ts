import { isValidObjectId } from "mongoose";

export const validateId = (id: string): boolean => {
  if (!isValidObjectId(id) && id) {
    return true;
  }

  return false;
};
