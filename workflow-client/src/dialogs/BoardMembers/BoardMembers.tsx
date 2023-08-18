import React from "react";

import { BoardMembersProps } from "./types";

import { TextField } from "@/components/form/TextInput";
import { debounce } from "lodash";
import { Link } from "react-router-dom";

import { usePagination } from "@/hooks/usePagination";

import useSearchBoardMembers from "@/service/useSearchBoardMembers";

import Pagination from "@/components/general/Pagination";

import User from "@/components/board/User";

import "./BoardMembers.scss";

import BoardMemberUser from "./BoardMemberUser/BoardMemberUser";

const BoardMembers: React.FC<BoardMembersProps> = ({ boardId }) => {
  const { currentPage, totalPages, limit, setCurrentPage, setTotalItems } = usePagination({
    initialPage: 1,
    limit: 8,
  });

  const { data, search, isLoading } = useSearchBoardMembers({
    boardId,
    limit,
    page: currentPage,
    onSuccess: (data) => {
      setTotalItems(data.totalCount);
    },
  });

  const searchDebounce = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    search(e.target.value);
  }, 1000);

  return (
    <div className="board-members">
      <Link to={`/board/${boardId}/settings`}>Manage members</Link>
      <TextField onChange={searchDebounce} />
      {data?.members.map((member) => (
        <User key={member.user.username} username={member.user.username}>
          {member.role}
        </User>
      ))}
      {/* {isLoading && [...Array(limit)].map((_, index) => <UserLoading key={index} />)} */}

      <Pagination current={currentPage} total={totalPages} handleChange={setCurrentPage} />
    </div>
  );
};

export default BoardMembers;
