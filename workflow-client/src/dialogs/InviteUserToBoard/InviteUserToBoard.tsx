import React, { useMemo } from "react";

import AsyncSearch from "@/components/form/AsyncSearch";
import { OptionType } from "@/components/form/AsyncSearch/SearchOptionType";
import { useParams } from "react-router-dom";

import useList from "@/hooks/useList";

import { useAddBoardMember, useSearchBoardMembers } from "@/service/member";
import { useSearchUsers } from "@/service/user";

import User from "@/components/board/User";

type InviteUserToBoardProps = {
  closeModal?: () => void;
};

const InviteUserToBoard: React.FC<InviteUserToBoardProps> = ({ closeModal }) => {
  const { id: boardId = "" } = useParams<{ id: string }>();

  const { mutateAsync: addUserToBoard } = useAddBoardMember({ boardId });
  const {
    data: selectedUsers,
    addItem: addToSelectedUser,
    removeItem: removeFromSelectedUser,
    clear: clearSelectedUsers,
  } = useList<User & OptionType>();

  const onOptionSelect = (option: User & OptionType) => {
    addToSelectedUser(option);
  };

  const { data: users = [], search } = useSearchUsers({
    limit: 10,
    page: 1,
    keepPreviousData: true,
    select: (data) => data?.users?.map((user) => ({ ...user, id: user._id, label: user.username })),
  });

  const { data: members = [], search: searchMembers } = useSearchBoardMembers<User[]>({
    boardId,
    keepPreviousData: true,
    select: (data) => data?.members?.map(({ user }) => user),
  });

  const searchUsersHandler = (term: string) => {
    search(term);
    searchMembers(term);
  };

  const addSelectedUsersToBoard = async () => {
    await Promise.all(users.map(({ _id }) => addUserToBoard(_id))).then(() => closeModal?.());
  };

  const availableUsers = useMemo(() => {
    return users.map((user) => {
      const isMember = members?.find((member) => member._id === user?._id);
      const isSelected = selectedUsers?.find((selectedUser) => selectedUser._id === user?._id);
      return {
        ...user,
        disabled: !!(isMember || isSelected),
      };
    });
  }, [users, members, selectedUsers]);

  return (
    <div>
      <AsyncSearch<User>
        options={availableUsers}
        showSelectedValues={false}
        filterOptions={false}
        hideSelectedOptions={false}
        debounceCallback={searchUsersHandler}
        onSelect={onOptionSelect}
        onClearSelection={clearSelectedUsers}
      />
      <button onClick={addSelectedUsersToBoard} className="btn--glow">
        Add to the board
      </button>
      {selectedUsers.map((user) => (
        <User key={user._id} username={user.username}>
          <button className="btn" onClick={() => removeFromSelectedUser(user, "_id")}>
            -
          </button>
        </User>
      ))}
    </div>
  );
};

export default InviteUserToBoard;
