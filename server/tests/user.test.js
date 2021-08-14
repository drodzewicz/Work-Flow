const UserService = require("../services/UserService");
const bcrypt = require("bcryptjs");
const { RequiredFieldError, AuthError } = require("../error/");
const mockUserRepository = require("./mocks/repositories/mockUserRepository");
const mockDatabase = require("./mocks/data");

const userService = UserService({ UserRepository: mockUserRepository });

describe("USER", () => {
  describe("REGISTRATION", () => {
    const testUser = mockDatabase.users[0];
    it("should pass: username, password, name, surname, email to database", async () => {
      await userService.register(testUser);

      const parsedUser = mockUserRepository.createUser.mock.calls[0][0];
      expect(parsedUser).toHaveProperty("name");
      expect(parsedUser).toHaveProperty("surname");
      expect(parsedUser).toHaveProperty("email");
      expect(parsedUser).toHaveProperty("username");
      expect(parsedUser).toHaveProperty("password");
    });

    it("should hash password", async () => {
      await userService.register(testUser);
      const parsedUser = mockUserRepository.createUser.mock.calls[0][0];

      expect(parsedUser).not.toHaveProperty("password", testUser.password);
      const isPasswordMatch = await bcrypt.compare(testUser.password, parsedUser.password);
      expect(isPasswordMatch).toBe(true);
    });

    it("should throw an error if password is not provided", async () => {
      const noPasswordUser = { ...testUser };
      delete noPasswordUser.password;
      await expect(userService.register(noPasswordUser)).rejects.toThrow(RequiredFieldError);
    });
  });

  describe("LOGIN", () => {
    const testUser = mockDatabase.users[0];
    it("should throw a bad login error when wrong password is provided", async () => {
      const wrongPasswordUser = { username: testUser.username, password: "wrongpassword" };
      await expect(userService.login(wrongPasswordUser)).rejects.toThrow(AuthError);
    });
  });
});
