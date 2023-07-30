import { MemberDTO } from "../types/dto/index.js";
import { BoardMember, UserDocument } from "../types/database/index.js";
import { UserMapper } from "./user.mapper.js";

export const MemberMapper = (data: BoardMember): MemberDTO => {
  if (!data) {
    return null;
  }
  return {
    role: data.role,
    user: UserMapper(data.user as UserDocument),
  };
};
