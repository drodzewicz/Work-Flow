import React, { useCallback, useState } from "react";

import debounce from "lodash/debounce";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { ActionMeta, MultiValue } from "react-select";
import AsyncSelect from "react-select/async";

import useAuthClient from "@/hooks/useClient";

import useAddUserToBoard from "@/service/useAddUserToBoard";

import Button from "@/components/general/Button";

const InviteUserToBoard: React.FC = () => {
  const { id: boardId = "" } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const client = useAuthClient();
  const { mutateAsync: addUserToBoard } = useAddUserToBoard();
  const [selectedUsers, setSelectedUsers] = useState<{ label: string; value: string }[]>([]);

  const loadOptions = useCallback(
    debounce((searchTerm: string, callback: (data: any) => void) => {
      client
        .get("/users", { params: { limit: 5, page: 1, username: searchTerm } })
        .then((options: any) => {
          const users = options.data?.users?.map((user: any) => ({
            value: user?._id,
            label: user?.username,
          }));
          return callback(users);
        });
    }, 1000),
    []
  );

  const addSelectedUsersToBoard = async () => {
    await Promise.all(
      selectedUsers.map(({ value }) => addUserToBoard({ boardId, userId: value }))
    ).then(() => {
      queryClient.invalidateQueries(["board-memebers", boardId]);
    });
  };

  const selectOptions = (
    data: MultiValue<{ label: string; value: string }>,
    actions: ActionMeta<{ label: string; value: string }>
  ) => {
    if (actions.action === "select-option") {
      const values = data.map(({ label, value }) => ({ label, value }));
      setSelectedUsers(values);
    }
  };

  return (
    <div>
      <AsyncSelect onChange={selectOptions} isMulti loadOptions={loadOptions} />
      <Button onClick={addSelectedUsersToBoard} variant="glow">
        Add to the board
      </Button>
    </div>
  );
};

export default InviteUserToBoard;
