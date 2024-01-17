const users = [
  {
    _id: "user-1",
    username: "user_one",
    name: "user_name_one",
    surname: "user_surname_one",
    email: "user_one@mail.com",
    avatarImageURL: undefined,
  },
  {
    _id: "user-2",
    username: "user_two",
    name: "user_name_two",
    surname: "user_surname_two",
    email: "user_two@mail.com",
    avatarImageURL: undefined,
  },
  {
    _id: "user-3",
    username: "user_three",
    name: "user_name_three",
    surname: "user_surname_three",
    email: "user_three@mail.com",
    avatarImageURL: undefined,
  },
  {
    _id: "user-4",
    username: "user_four",
    name: "user_name_four",
    surname: "user_surname_four",
    email: "user_four@mail.com",
    avatarImageURL: undefined,
  },
  {
    _id: "user-5",
    username: "user_five",
    name: "user_name_five",
    surname: "user_surname_five",
    email: "user_five@mail.com",
    avatarImageURL: undefined,
  },
];

const tags = [
  { _id: "tag-1", name: "tag one", key: "#c44242" },
  { _id: "tag-2", name: "tag two", key: "#42c44d" },
  { _id: "tag-3", name: "tag three", key: "#4246c4" },
];

const tasks: Task[] = [
  {
    _id: "test-id-1",
    title: "test task title one",
    description: "test task description one",
    tags: tags,
    assignees: users,
    author: users[0],
  },
  {
    _id: "test-id-2",
    title: "test task title two",
    description: "test task description one",
    tags: tags,
    assignees: users,
    author: users[0],
  },
  {
    _id: "test-id-3",
    title: "test task title three",
    description: "test task description one",

    tags: tags,
    assignees: users,
    author: users[0],
  },
  {
    _id: "test-id-4",
    title: "test task title four",
    description: "test task description one",

    tags: tags,
    assignees: users,
    author: users[0],
  },
];

const columns: Column[] = [
  { _id: "column-id-1", name: "column one" },
  { _id: "column-id-2", name: "column two" },
  { _id: "column-id-3", name: "column three" },
];

const columnsWithTasks: ColumnWithTasks[] = columns.map((col) => ({ ...col, tasks: tasks }));

const boards = [
  {
    _id: "board_id_1",
    name: "Test board 1",
    timeCreated: new Date(),
    description: "test description",
    isPinned: false,
  },
  {
    _id: "board_id_2",
    name: "Test board 2",
    timeCreated: new Date(),
    description: "test description",
    isPinned: false,
  },
  {
    _id: "board_id_3",
    name: "Test board 3",
    timeCreated: new Date(),
    description: "test description",
    isPinned: false,
  },
];

const notifications = [
  {
    _id: "notification-id-1",
    description: "notification one test description",
    title: "test title three",
    key: "test-key",
    attributes: { one: "one-attr", two: "two-attr" },
    timeStamp: new Date(),
  },
  {
    _id: "notification-id-1",
    description: "notification two test description",
    title: "test titl two",
    key: "test-key",
    attributes: { one: "one-attr", two: "two-attr" },
    timeStamp: new Date(),
  },
];

export { users, tags, tasks, boards, columns, notifications, columnsWithTasks };
