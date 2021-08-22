const UserService = require("../services/UserService");
const bcrypt = require("bcryptjs");
const { RequiredFieldError, AuthError } = require("../error/");
const mockUserRepository = require("./mocks/repositories/mockUserRepository");
const mockDatabase = require("./mocks/data");

describe("USER", () => {
  let userService;
  let UserRepository;

  beforeEach(() => {
    UserRepository = mockUserRepository();
    userService = UserService({ UserRepository });
  });

  describe("REGISTRATION", () => {
    it("should pass: username, password, name, surname, email to database", async () => {
      await userService.register(mockDatabase.user);

      const parsedUser = UserRepository.createUser.mock.calls[0][0];
      expect(parsedUser).toHaveProperty("name");
      expect(parsedUser).toHaveProperty("surname");
      expect(parsedUser).toHaveProperty("email");
      expect(parsedUser).toHaveProperty("username");
      expect(parsedUser).toHaveProperty("password");
    });

    it("should hash password", async () => {
      await userService.register(mockDatabase.user);
      const parsedUser = UserRepository.createUser.mock.calls[0][0];

      expect(parsedUser).not.toHaveProperty("password", mockDatabase.user.password);
      const isPasswordMatch = await bcrypt.compare(mockDatabase.user.password, parsedUser.password);
      expect(isPasswordMatch).toBe(true);
    });

    it("should throw an error if password is not provided", async () => {
      const noPasswordUser = { ...mockDatabase.user };
      delete noPasswordUser.password;
      await expect(userService.register(noPasswordUser)).rejects.toThrow(RequiredFieldError);
    });
  });

  describe("LOGIN", () => {
    it("should throw a bad login error when wrong password is provided", async () => {
      const wrongPasswordUser = { username: mockDatabase.user.username, password: "wrongpassword" };
      await expect(userService.login(wrongPasswordUser)).rejects.toThrow(AuthError);
    });

    it("should throw an error if unknown username is submited", async () => {
      const userService = UserService({
        UserRepository: {
          getUserByUsername: mockUserRepository.getUserByUsernameReturnsNull,
        },
      });
      const uknownUsernameUser = { username: "uknown", password: "password" };
      await expect(userService.login(uknownUsernameUser)).rejects.toThrow();
    });
  });

  describe("GET USER", () => {
    it("should return a user", async () => {
      const foundUser = await userService.getUser("userId");
      await expect(foundUser).not.toBe(null);
    });

    it("should throw an error if user is not found", async () => {
      const userService = UserService({
        UserRepository: {
          getUserByUsername: mockUserRepository.getUserByIdReturnsNull,
        },
      });
      await expect(userService.getUser("userId")).rejects.toThrow();
    });
  });

  describe("CHANGE PASSWORD", () => {
    it("should throw an error if newPassword does not equal to matchPassword", async () => {
      await expect(
        userService.changePassword("userId", {
          newPassword: "password",
          matchPassword: "unmatched",
        })
      ).rejects.toThrow();
    });

    it("should update user with hashed new password", async () => {
      const newPassword = "newPassword";
      await userService.changePassword("userId", {
        newPassword: newPassword,
        matchPassword: newPassword,
      });
      const { password } = UserRepository.updateUser.mock.calls[0][1];
      const isPasswordMatch = await bcrypt.compare(newPassword, password);
      expect(isPasswordMatch).toBe(true);
    });
  });

  describe("CHANGE AVATAR", () => {
    it("should pass avatarImageURL as a second parameter to updateUser", async () => {
      const imageURL = "test_image_url";
      await userService.changeAvatarImage("userId", imageURL);

      expect(UserRepository.updateUser).toHaveBeenCalledWith("userId", { avatarImageURL: imageURL });
    });
  });

  describe("UPDATE USER INFO", () => {
    it("should pass avatarImageURL as a second parameter to updateUser", async () => {
      const newUserInfo = { name: "new_name", surname: "new_surname", email: "new_email" };
      await userService.updateUserInfo("userId", newUserInfo);
      const updateUserData = UserRepository.updateUser.mock.calls[0][1];

      expect(updateUserData).toEqual(newUserInfo);
    });
  });

  describe("MATCH USER BY REGEX", () => {
    it("should pass avatarImageURL as a second parameter to updateUser", async () => {
      const searchedUsername = "searched_username";
      await userService.matchUserByRegex(searchedUsername);
      const searchRegex = UserRepository.getUsersByMatchUsername.mock.calls[0][0];

      expect(searchRegex).toEqual(searchedUsername);
    });
  });
});
