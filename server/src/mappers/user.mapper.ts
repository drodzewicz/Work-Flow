import { UserDTO } from "../types/dto/index.js";
import { UserDocument } from "../types/database/index.js";

export const UserMapper = (data: UserDocument): UserDTO => {
  if (!data) {
    return null;
  }
  return {
    _id: data._id.toString(),
    username: data.username,
    name: data.name,
    surname: data.surname,
    email: data.email,
    avatarImageURL: data.avatarImageURL,
  };
};
