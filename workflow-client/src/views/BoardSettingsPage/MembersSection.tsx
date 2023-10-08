import React, { useEffect } from "react";

import AsyncInput from "@/components/form/AsyncInput";
import AsyncSearch from "@/components/form/AsyncSearch";

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

  const {
    data = { totalCount: 0, members: [] },
    search,
    isLoading,
  } = useSearchBoardMembers({
    boardId,
    limit,
    page: currentPage,
    keepPreviousData: true,
  });

  useEffect(() => {
    setTotalItems(data.totalCount);
  }, [data.totalCount]);

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
      <AsyncInput debounceCallback={search} isLoading={isLoading} debounceTime={500} />
      {data.members.map((member) => (
        <User key={member.user.username} username={member.user.username}>
          {canManageMembers && (
            <>
              <AsyncSearch
                disabled={member.user._id === user?._id}
                options={Object.keys(roles).map((role) => ({ id: role, label: role }))}
                selectedOptions={[{ id: member.role, label: member.role }]}
                debounceTime={0}
                isSearchable={false}
                isClearable={false}
                onSelect={({ id }) => updateMemberRole({ userId: member.user._id, role: id })}
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
