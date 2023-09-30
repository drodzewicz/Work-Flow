import React, { useEffect } from "react";

import AsyncInput from "@/components/form/AsyncInput";
import RoleSelect from "@/components/form/RoleSelect/RoleSelect";

import useAuth from "@/hooks/useAuth";
import useBoardId from "@/hooks/useBoardId";
import useModal from "@/hooks/useModal";
import { usePagination } from "@/hooks/usePagination";
import useRBAC from "@/hooks/useRBAC";

import { useRemoveBoardMember, useSearchBoardMembers } from "@/service/member";
import { useUpdateMemberRole, useGetBoardRoles } from "@/service/permission";

import Pagination from "@/components/general/Pagination";

import Modal from "@/components/layout/Modal";

import User from "@/components/board/User";

import InviteUserToBoard from "@/dialogs/InviteUserToBoard";

const MembersSection = () => {
  const boardId = useBoardId();
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
    keepPreviousData: true,
  });

  useEffect(() => {
    setTotalItems(data?.totalCount ?? 0);
  }, [data?.totalCount]);

  const canManageMembers = useRBAC({ boardId, action: "MANAGE_BOARD_MEMBERS" });

  const { data: roles = {} } = useGetBoardRoles({ boardId });
  const { mutate: removeMember } = useRemoveBoardMember({ boardId });
  const { mutate: updateMemberRole } = useUpdateMemberRole({ boardId });

  return (
    <section className="my-2">
      <h2 className="text-lg font-bold mb-3">Members</h2>
      <hr />
      {canManageMembers && (
        <>
          <button className="btn" onClick={openInviteUserDialog}>
            Invite new members
          </button>
          <Modal
            show={showInviteUserDialog}
            title="Invite users to the board"
            size="s"
            onClose={closeInviteUserDialog}
          >
            <InviteUserToBoard closeModal={closeInviteUserDialog} />
          </Modal>
        </>
      )}
      <AsyncInput onChange={search} isLoading={isLoading} debounceTime={500} />
      {data?.members.map((member) => (
        <User key={member.user.username} username={member.user.username}>
          {canManageMembers && (
            <>
              <RoleSelect
                disabled={member.user._id === user?._id}
                initialValue={member.role}
                roles={roles}
                onSelect={(role) => updateMemberRole({ userId: member.user._id, role })}
              />
              <button
                disabled={member.user._id === user?._id}
                className="btn"
                onClick={() => removeMember(member.user._id)}
              >
                remove
              </button>
            </>
          )}
        </User>
      ))}
      <Pagination current={currentPage} total={totalPages} handleChange={setCurrentPage} />
    </section>
  );
};

export default MembersSection;
