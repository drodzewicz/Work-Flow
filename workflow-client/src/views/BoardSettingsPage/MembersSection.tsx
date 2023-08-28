import React from "react";

import AsyncInput from "@/components/form/AsyncInput";
import RoleSelect from "@/components/form/RoleSelect/RoleSelect";
import { useParams } from "react-router-dom";
import Select, { ActionMeta } from "react-select";

import useAuth from "@/hooks/useAuth";
import useModal from "@/hooks/useModal";
import { usePagination } from "@/hooks/usePagination";

import useGetBoardRoles from "@/service/useGetBoardRoles";
import useRemoveUserFromBoard from "@/service/useRemoveMemberFromBoard";
import useSearchBoardMembers from "@/service/useSearchBoardMembers";
import useUpdateMemberRole from "@/service/useUpdateMemberRole";

import Pagination from "@/components/general/Pagination";

import Modal from "@/components/layout/Modal";

import User from "@/components/board/User";

import InviteUserToBoard from "@/dialogs/InviteUserToBoard";

const MembersSection = () => {
  const { id: boardId = "" } = useParams<{ id: string }>();

  const { user } = useAuth();

  const {
    show: showInviteUserDialog,
    close: closeInviteUserDialog,
    open: openInviteUserDialog,
  } = useModal();

  const { limit, currentPage, totalPages, setTotalItems, setCurrentPage } = usePagination({
    initialPage: 1,
    limit: 5,
  });

  const { data, search, isLoading } = useSearchBoardMembers({
    boardId,
    limit,
    page: currentPage,
    setTotalItems,
  });

  const { data: roles = {} } = useGetBoardRoles({ boardId });
  const { mutate: removeMember } = useRemoveUserFromBoard();
  const { mutate: updateMemberRole } = useUpdateMemberRole({ boardId });

  return (
    <section className="my-2">
      <h2 className="text-lg font-bold mb-3">Members</h2>
      <hr />
      <button className="btn" onClick={openInviteUserDialog}>
        Invite new members
      </button>
      <AsyncInput onChange={search} isLoading={isLoading} debounceTime={500} />
      {data?.members.map((member) => (
        <User key={member.user.username} username={member.user.username}>
          <RoleSelect
            disabled={member.user._id === user._id}
            initialValue={member.role}
            roles={roles}
            onSelect={(role) => updateMemberRole({ userId: member.user._id, role })}
          />
          <button
            disabled={member.user._id === user._id}
            className="btn"
            onClick={() => removeMember({ boardId, userId: member.user._id })}
          >
            remove
          </button>
        </User>
      ))}
      <Pagination current={currentPage} total={totalPages} handleChange={setCurrentPage} />
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
