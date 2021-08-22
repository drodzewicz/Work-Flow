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
    _id: "test3_id",
    username: "test_user3match",
    password: "test_password",
    name: "test_name",
    surname: "test_surname",
    email: "test_user1@mail.com",
  },
  {
    _id: "test4_id",
    username: "test_user4_match",
    password: "test_password",
    name: "test_name",
    surname: "test_surname",
    email: "test_user1@mail.com",
  },
];

mockDatabase.tags = [
  { 
    _id: "tag_1",
    color: "RED",
    name: "test_red_tag"
  },
  { 
    _id: "tag_2",
    color: "BLUE",
    name: "test_blue_tag"
  }
]

mockDatabase.tasks = [
  {
    _id: "task_1",
    title: "task_title",
    description: "task_description",
    author: "",
    board: "",
    people: [
      mockDatabase.users[0]
    ],
    tags: mockDatabase.tags
  },
  {
    _id: "task_2",
    title: "task_title",
    description: "task_description",
    author: "",
    board: "",
    people: [
      mockDatabase.users[2],
      mockDatabase.users[3]
    ],
    tags: mockDatabase.tags
  },
  {
    _id: "task_3",
    title: "task_title",
    description: "task_description",
    author: "",
    board: "",
    people: [
      mockDatabase.users[2],
      mockDatabase.users[3]
    ],
    tags: mockDatabase.tags
  }
]

mockDatabase.columns = [
  {
    _id: "column_id_1",
    name: "column_one",
    tasks: mockDatabase.tasks.slice(0, 2)
  },
  {
    _id: "column_id_2",
    name: "column_two",
    tasks: mockDatabase.tasks.slice(2, 3)
  },
  {
    _id: "column_id_3",
    name: "column_three",
    tasks: mockDatabase.tasks.slice(2, 3)
  }
]

mockDatabase.members = [
  {
    role: "OWNER",
    user: mockDatabase.users[0],
  },
  {
    role: "GUEST",
    user: mockDatabase.users[1],
  },
  {
    role: "ADMIN",
    user: mockDatabase.users[2],
  },
  {
    role: "REGULAR",
    user: mockDatabase.users[3],
  },
]

mockDatabase.fullBoard = {
  _id: "board_id",
  name: "board name",
  description: "booard description",
  author: mockDatabase.users[0]._id,
  columns: mockDatabase.columns,
  members: mockDatabase.members
}

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
