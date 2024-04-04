type Board = { _id: string; name: string; description: string; timeCreated: string };

type User = { _id: string; username: string; name: string; surname: string; email: string };

type Member = { role: string; user: User };

type Tag = { key: string; name: string; _id: string };

