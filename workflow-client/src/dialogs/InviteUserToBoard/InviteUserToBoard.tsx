import React from "react";

import UserSelect, { DefaultOption } from "@/components/form/UserSelect/UserSelect";
import { AxiosResponse } from "axios";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

import useAuthClient from "@/hooks/useClient";
import useList from "@/hooks/useList";

import useAddUserToBoard from "@/service/useAddUserToBoard";

import User from "@/components/board/User";

const InviteUserToBoard: React.FC = () => {
  const { id: boardId = "" } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const client = useAuthClient();

  const { mutateAsync: addUserToBoard } = useAddUserToBoard();
  const { data: users, addItem: addUser, removeItem: removeUser } = useList<User>();

  const addSelectedUsersToBoard = async () => {
    await Promise.all(users.map(({ _id }) => addUserToBoard({ boardId, userId: _id }))).then(() => {
      queryClient.invalidateQueries(["board-memebers", boardId]);
    });
  };

  const loadUsers = async (searchTerm: string) => {
    const params = { limit: 5, page: 1, username: searchTerm };
    return Promise.all([
      client.get("/users", { params }),
      client.get(`/boards/${boardId}/members`, { params }),
    ]).then(([respo1, respo2]) => {
      return respo1.data?.users?.map((user: any) => ({
        value: user?._id,
        label: user?.username,
        user,
        disabled: !!respo2.data?.members?.find((member: any) => member?.user?._id === user?._id),
      }));
    });
  };

  const isOptionDisabled = ({
    disabled,
    value,
  }: DefaultOption & { disabled: boolean; user: User }) =>
    disabled || !!users.find((user) => user._id === value);

  return (
    <div>
      <UserSelect<
        (DefaultOption & { disabled: boolean; user: User })[],
        DefaultOption & { disabled: boolean; user: User }
      >
        loadData={loadUsers}
        transformData={(option) => option}
        isOptionDisabled={isOptionDisabled}
        onSelect={(option) => addUser(option.user)}
      />
      <button onClick={addSelectedUsersToBoard} className="btn--glow">
        Add to the board
      </button>
      {users.map((user) => (
        <User key={user._id} username={user.username}>
          <button className="btn" onClick={() => removeUser(user, "_id")}>
            -
          </button>
        </User>
      ))}
    </div>
  );
};

export default InviteUserToBoard;
