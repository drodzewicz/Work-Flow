import React from "react";

import { useParams } from "react-router-dom";

import useModal from "@/hooks/useModal";
import { usePagination } from "@/hooks/usePagination";

import useGetBoardMembers from "@/service/useGetBoardMembers";

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

  return (
    <section>
      <h2>Members</h2>
      <Button onClick={openInviteUserDialog}>Invite new members</Button>
      <SearchInput
        search={() => 1}
        debounceTimeout={500}
        result={[]}
        clickResult={() => 1}
        clear={() => 1}
      />
      {membersData?.members.map((member) => (
        <User username={member.user.username}></User>
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
