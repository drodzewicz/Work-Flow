import React from "react";

import Button from "@/components/form/Button";
import { TextField } from "@/components/form/TextInput";
import debounce from "lodash/debounce";
import { useParams } from "react-router-dom";
import Select, { ActionMeta } from "react-select";

import useModal from "@/hooks/useModal";
import { usePagination } from "@/hooks/usePagination";

import useGetBoardRoles from "@/service/useGetBoardRoles";
import useRemoveUserFromBoard from "@/service/useRemoveMemberFromBoard";
import useSearchBoardMembers from "@/service/useSearchBoardMembers";
import useUpdateMemberRole from "@/service/useUpdateMemberRole";

import Modal from "@/components/layout/Modal";

import User from "@/components/board/User";

import InviteUserToBoard from "@/dialogs/InviteUserToBoard";

const MembersSection = () => {
  const { id: boardId = "" } = useParams<{ id: string }>();

  const {
    show: showInviteUserDialog,
    close: closeInviteUserDialog,
    open: openInviteUserDialog,
  } = useModal();

  const { limit, currentPage, setTotalItems } = usePagination({ initialPage: 1, limit: 10 });
  const { data: membersData, search } = useSearchBoardMembers({
    boardId,
    limit,
    page: currentPage,
    onSuccess: (data) => {
      setTotalItems(data.totalCount);
    },
  });
  const { data: roles = {} } = useGetBoardRoles({ boardId });
  const { mutate: removeMember } = useRemoveUserFromBoard();
  const { mutate: updateMemberRole } = useUpdateMemberRole({ boardId });
  const rolesList = Object.keys(roles).map((role) => ({ value: role, label: role }));

  const searchDebounce = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    search(e.target.value);
  }, 1000);

  const chooseRole = (
    data: { label?: string; value?: string; userId: string },
    actions: ActionMeta<{ label: string; value: string }>
  ) => {
    if (actions.action === "select-option") {
      const role = data?.value ?? "";
      const userId = data?.userId ?? "";
      updateMemberRole({ userId, role });
    }
  };

  return (
    <section className="my-2">
      <h2 className="text-lg font-bold mb-3">Members</h2>
      <hr />
      <Button onClick={openInviteUserDialog}>Invite new members</Button>
      <TextField onChange={searchDebounce} />
      {membersData?.members.map((member) => (
        <User key={member.user.username} username={member.user.username}>
          <Select
            defaultValue={rolesList.find((role) => role.value === member.role)}
            options={rolesList}
            onChange={(option, actions) =>
              chooseRole({ ...option, userId: member.user._id }, actions)
            }
          />
          <Button onClick={() => removeMember({ boardId, userId: member.user._id })}>remove</Button>
        </User>
      ))}
      <Modal
        show={showInviteUserDialog}
        title="Invite users to the board"
        size="s"
        onClose={closeInviteUserDialog}
      >
        <InviteUserToBoard />
      </Modal>
    </section>
  );
};

export default MembersSection;
