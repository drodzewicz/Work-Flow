type User = {
  _id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  avatarImageURL?: string;
};

type Board = {
  _id: string;
  timeCreated: Date;
  name: string;
  description: string;
};

type BoradMember = {
  role: string;
  user: User;
};

type Column = {
  name: string;
  _id: string;
};

type Tag = {
  _id: string;
  name: string;
  key: string;
};

type Task = {
  _id: string;
  title: string;
  description: string;
  author: User;
  assignees: User[];
  tags: Tag[];
};

type ColumnWithTasks = Column & { tasks: Task[] };

type BoardNotification = {
  _id: string;
  title: string;
  description: string;
  key: string;
  attributes?: Record<string, string>;
  timeStamp: Date;
};
