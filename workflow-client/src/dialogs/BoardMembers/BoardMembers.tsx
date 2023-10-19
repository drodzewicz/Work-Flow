import React, { useEffect, useState } from "react";

import AsyncInput from "@/components/form/AsyncInput";
import { getRoleIcon } from "@/utils/role";
import { FaCog, FaSearch } from "react-icons/fa";
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { currentPage, totalPages, limit, setCurrentPage, setTotalItems } = usePagination({
    initialPage: 1,
    limit: 6,
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
        <Link className=" manage-members-btn" to={`/board/${boardId}/settings`}>
          <FaCog />
          Manage members
        </Link>
      )}
      <AsyncInput
        placeholder="Search members..."
        debounceCallback={search}
        value={searchTerm}
        onChange={setSearchTerm}
        isLoading={isLoading}
        debounceTime={500}
      >
        <FaSearch />
      </AsyncInput>

      <div className="board-members__members">
        {data?.members.map((member) => {
          const RoleIcon = getRoleIcon(member.role);
          return (
            <User key={member.user.username} username={member.user.username}>
              <div className="user__member-role">
                <RoleIcon />
                {member.role}
              </div>
            </User>
          );
        })}
        <Pagination current={currentPage} total={totalPages} handleChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default BoardMembers;
