import { UserDTO } from "../types/dto/user.dto.js";
import { IUserModel } from "../types/database/user.type.js";

export const UserMapper = (data: IUserModel): UserDTO => {
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
