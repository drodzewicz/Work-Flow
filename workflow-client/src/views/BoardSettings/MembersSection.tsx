import React from "react";

import { useParams } from "react-router-dom";
import Select from "react-select";

import useModal from "@/hooks/useModal";
import { usePagination } from "@/hooks/usePagination";

import useGetBoardMembers from "@/service/useGetBoardMembers";
import useGetBoardRoles from "@/service/useGetBoardRoles";
import useRemoveUserFromBoard from "@/service/useRemoveMemberFromBoard";

import Button from "@/components/general/Button";
import SearchInput from "@/components/general/SearchInput";

import Modal from "@/components/layout/Modal";

import User from "@/components/board/User";

import InviteUserToBoard from "@/dialogs/InviteUserToBoard";

const MembersSection = () => {
  const params = useParams<{ id: string }>();

  const {
    show: showInviteUserDialog,
    close: closeInviteUserDialog,
    open: openInviteUserDialog,
  } = useModal();

  const { limit, currentPage } = usePagination({ initialPage: 1, limit: 10 });
  const { data: membersData } = useGetBoardMembers({
    boardId: params.id ?? "",
    limit,
    page: currentPage,
  });
  const { data: roles = {} } = useGetBoardRoles({ boardId: params.id ?? "" });
  const { mutate: removeMember } = useRemoveUserFromBoard();

  const rolesList = Object.keys(roles).map((role) => ({ value: role, label: role }));

  return (
    <section className="my-2">
      <h2 className="text-lg font-bold mb-3">Members</h2>
      <hr />
      <Button onClick={openInviteUserDialog}>Invite new members</Button>
      <SearchInput
        search={() => 1}
        debounceTimeout={500}
        result={[]}
        clickResult={() => 1}
        clear={() => 1}
      />
      {membersData?.members.map((member) => (
        <User key={member.user.username} username={member.user.username}>
          <Select
            defaultValue={rolesList.find((role) => role.value === member.role)}
            options={rolesList}
          />
          <Button
            onClick={() => removeMember({ boardId: params.id ?? "", userId: member.user._id })}
          >
            remove
          </Button>
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
