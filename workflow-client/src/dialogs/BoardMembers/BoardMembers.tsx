import React from "react";

import AsyncInput from "@/components/form/AsyncInput";
import { Link } from "react-router-dom";

import { usePagination } from "@/hooks/usePagination";

import useSearchBoardMembers from "@/service/useSearchBoardMembers";

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

  const { data, search, isLoading } = useSearchBoardMembers({
    boardId,
    limit,
    page: currentPage,
    setTotalItems,
  });

  return (
    <div className="board-members">
      <Link className="btn" to={`/board/${boardId}/settings`}>
        Manage members
      </Link>
      <AsyncInput onChange={search} isLoading={isLoading} debounceTime={500} />
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
