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
    _id: "user1_id",
    username: "test_user1",
    password: "test_password",
    name: "test_name",
    surname: "test_surname",
    email: "test_user1@mail.com",
  },
  {
    _id: "user2_id",
    username: "test_user2",
    password: "test_password",
    name: "test_name",
    surname: "test_surname",
    email: "test_user1@mail.com",
  },
  {
    _id: "user3_id",
    username: "test_user2",
    password: "test_password",
    name: "test_name",
    surname: "test_surname",
    email: "test_user1@mail.com",
  },
  {
    _id: "user4_id",
    username: "test_user2",
    password: "test_password",
    name: "test_name",
    surname: "test_surname",
    email: "test_user1@mail.com",
  },
];

mockDatabase.boards = [
  {
    _id: "board_id_1",
    name: "board_1",
    description: "board_1_description",
    author: mockDatabase.users[0]._id,
  },
  {
    _id: "board_id_2",
    name: "board_2",
    description: "board_2_description",
    author: mockDatabase.users[0]._id,
  },
  {
    _id: "board_id_3",
    name: "board_3",
    description: "board_3_description",
    author: mockDatabase.users[1]._id,
  },
  {
    _id: "board_id_4",
    name: "board_4",
    description: "board_4_description",
    author: mockDatabase.users[0]._id,
  },
  {
    _id: "board_id_5",
    name: "board_5",
    description: "board_5_description",
    author: mockDatabase.users[0]._id,
  },
];

mockDatabase.pinnedBoards = mockDatabase.boards.slice(0, 2);

module.exports = mockDatabase;
