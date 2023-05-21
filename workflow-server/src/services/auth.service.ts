import { UserRepository } from "../repositories/user.repository.js";
import { Service, Inject } from "typedi";

@Service()
export class AuthService {
    @Inject()
    userRepository: UserRepository;

      async getUser(userId: string) {
       
      }

}