import React, { useEffect } from "react";

import AsyncInput from "@/components/form/AsyncInput";
import AsyncSearch from "@/components/form/AsyncSearch";
import { FaEnvelope, FaSearch } from "react-icons/fa";

import useAuth from "@/hooks/useAuth";
import useBoardId from "@/hooks/useBoardId";
import useModal from "@/hooks/useModal";
import { usePagination } from "@/hooks/usePagination";
import useRBAC from "@/hooks/useRBAC";

import { useRemoveBoardMember, useSearchBoardMembers } from "@/service/member";
import { useUpdateMemberRole, useGetBoardRoles } from "@/service/permission";

import Pagination from "@/components/general/Pagination";

import ItemContainer from "@/components/layout/ItemContainer";
import Modal from "@/components/layout/Modal";
import * as Skeleton from "@/components/layout/Skeleton";

import { CustomRoleOption } from "@/components/board/CustomOption";
import User from "@/components/board/User";

import InviteUserToBoard from "@/dialogs/InviteUserToBoard";

const MembersSection = () => {
  const boardId = useBoardId();
  const { user: currentUser } = useAuth();

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
    <section className="board-settings-page__section__members">
      {canManageMembers && (
        <>
          <button className="btn btn--glow invite-user-button" onClick={openInviteUserDialog}>
            <FaEnvelope /> Invite new members
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
      <AsyncInput debounceCallback={search} isLoading={isLoading} debounceTime={500}>
        <FaSearch />
      </AsyncInput>
      <Skeleton.Container show={isLoading} count={limit} element={<Skeleton.User />}>
        <ItemContainer<Member>
          itemKey="_id"
          items={data?.members}
          render={({ user, role }) => (
            <User key={user.username} username={user.username}>
              {canManageMembers && (
                <>
                  <AsyncSearch
                    className="role-select"
                    disabled={user._id === currentUser?._id}
                    options={Object.keys(roles).map((role) => ({ id: role, label: role }))}
                    selectedOptions={[{ id: role, label: role }]}
                    debounceTime={0}
                    isSearchable={true}
                    isClearable={false}
                    showSearchIcon={false}
                    onSelect={({ id }) => updateMemberRole({ userId: user._id, role: id })}
                    renderOption={(option) => <CustomRoleOption role={option.id} />}
                  />
                  <button
                    disabled={user._id === currentUser?._id}
                    className="btn"
                    onClick={() => removeMember(user._id)}
                  >
                    remove
                  </button>
                </>
              )}
            </User>
          )}
        />
      </Skeleton.Container>
      <Pagination current={currentPage} total={totalPages} handleChange={setCurrentPage} />
    </section>
  );
};

export default MembersSection;
