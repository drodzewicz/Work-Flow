import React, { useEffect } from "react";

import AsyncInput from "@/components/form/AsyncInput";
import { Link } from "react-router-dom";

import { usePagination } from "@/hooks/usePagination";
import useRBAC from "@/hooks/useRBAC";

import { useSearchBoardMembers } from "@/service/member";

import Pagination from "@/components/general/Pagination";

import User from "@/components/board/User";

import "./BoardMembers.scss";

export type BoardMembersProps = {
  boardId: string;
};

const BoardMembers: React.FC<BoardMembersProps> = ({ boardId }) => {
  const { currentPage, totalPages, limit, setCurrentPage, setTotalItems } = usePagination({
    initialPage: 1,
    limit: 5,
  });

  const canManageMembers = useRBAC({ boardId, action: "MANAGE_BOARD_MEMBERS" });

  const { data, search, isLoading } = useSearchBoardMembers({
    boardId,
    limit,
    page: currentPage,
    keepPreviousData: true,
  });

  useEffect(() => {
    setTotalItems(data?.totalCount ?? 0);
  }, [data?.totalCount]);

  return (
    <div className="board-members">
      {canManageMembers && (
        <Link className="btn" to={`/board/${boardId}/settings`}>
          Manage members
        </Link>
      )}

      <AsyncInput debounceCallback={search} isLoading={isLoading} debounceTime={500} />
      {data?.members.map((member) => (
        <User key={member.user.username} username={member.user.username}>
          {member.role}
        </User>
      ))}
      <Pagination current={currentPage} total={totalPages} handleChange={setCurrentPage} />
    </div>
  );
};

export default BoardMembers;
