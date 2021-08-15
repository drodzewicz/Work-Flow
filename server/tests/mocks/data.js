const mockDatabase = {};

mockDatabase.user = {
  username: "test_user1",
  password: "test_password",
  name: "test_name",
  surname: "test_surname",
  email: "test_user1@mail.com",
};

mockDatabase.users = [
  {
    id: "user1_id",
    username: "test_user1",
    password: "test_password",
    name: "test_name",
    surname: "test_surname",
    email: "test_user1@mail.com",
  },
  {
    id: "user2_id",
    username: "test_user2",
    password: "test_password",
    name: "test_name",
    surname: "test_surname",
    email: "test_user1@mail.com",
  },
  {
    id: "user3_id",
    username: "test_user2",
    password: "test_password",
    name: "test_name",
    surname: "test_surname",
    email: "test_user1@mail.com",
  },
  {
    id: "user4_id",
    username: "test_user2",
    password: "test_password",
    name: "test_name",
    surname: "test_surname",
    email: "test_user1@mail.com",
  },
];

module.exports = mockDatabase;
