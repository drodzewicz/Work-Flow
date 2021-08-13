const makeUserService = require("../services/UserService");
const bcrypt = require("bcryptjs");
const { PayloadValueError } = require("../error/");

const testUser = {
  username: "test_username",
  password: "test_password",
  name: "test_name",
  surname: "test_surname",
  email: "test@mail.com",
};

const createUser = jest.fn();
const userService = makeUserService({ createUser });

describe("USER", () => {
  describe("REGISTRATION", () => {
    it("should pass: username, password, name, surname, email to database", async () => {
      await userService.register(testUser);

      const parsedUser = createUser.mock.calls[0][0];
      expect(parsedUser).toHaveProperty("name");
      expect(parsedUser).toHaveProperty("surname");
      expect(parsedUser).toHaveProperty("email");
      expect(parsedUser).toHaveProperty("username");
      expect(parsedUser).toHaveProperty("password");
    });

    it("should hash password", async () => {
      await userService.register(testUser);
      const parsedUser = createUser.mock.calls[0][0];

      expect(parsedUser).not.toHaveProperty("password", testUser.password);
      const isPasswordMatch = await bcrypt.compare(testUser.password, parsedUser.password);
      expect(isPasswordMatch).toBe(true);
    });
  });
});
