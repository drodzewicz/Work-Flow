import React from "react";

import { useParams } from "react-router-dom";

import useAddUserToBoard from "@/service/useAddUserToBoard";
import useSearchUsers from "@/service/useSearchUsers";

import SearchInput from "@/components/general/SearchInput";

const InviteUserToBoard: React.FC = () => {
  const { id: boardId = "" } = useParams<{ id: string }>();
  const { data, search, clear } = useSearchUsers();
  const { mutate: addUserToBoard } = useAddUserToBoard();
  return (
    <div>
      <SearchInput
        search={search}
        debounceTimeout={500}
        result={(data?.users ?? []).map((user) => ({ _id: user._id, text: user.username }))}
        clickResult={({ _id }) => addUserToBoard({ boardId, userId: _id })}
        clear={clear}
      />
    </div>
  );
};

export default InviteUserToBoard;
