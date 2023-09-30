import React from "react";

import { Link, useNavigate } from "react-router-dom";

import useBoardId from "@/hooks/useBoardId";
import useRBAC from "@/hooks/useRBAC";

import { useDeleteBoard, useLeaveBoard } from "@/service/board";

import Box from "@/components/layout/Box";

import GeneralSection from "./GeneralSection";
import MembersSection from "./MembersSection";
import RoleSection from "./RoleSection";
import TagSection from "./TagSection";

const BoardSettingsPage: React.FC = () => {
  const boardId = useBoardId();
  const navigate = useNavigate();

  const canDeleteBoard = useRBAC({ boardId, action: "BOARD_DELETE" });
  const canModifyRoles = useRBAC({ boardId, action: "MEMBER_ROLE_UPDATE" });

  const { mutate: deleteBoard } = useDeleteBoard({
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  const { mutate: leaveBoard } = useLeaveBoard({
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  const deleteBoardHandler = () => {
    deleteBoard(boardId);
  };

  const leaveBoardHandler = () => {
    leaveBoard(boardId);
  };

  return (
    <Box className="flex flex-col">
      <div className="flex flex-row mb-3 justify-end">
        <button className="btn ml-0 mr-auto">
          <Link to={`/board/${boardId}`}>back to board</Link>
        </button>
        <button onClick={leaveBoardHandler} className="btn">
          Leave board
        </button>
        {canDeleteBoard && (
          <button onClick={deleteBoardHandler} className="btn">
            Delete Board
          </button>
        )}
      </div>
      <GeneralSection />
      {canModifyRoles && <RoleSection />}
      <MembersSection />
      <TagSection />
    </Box>
  );
};

export default BoardSettingsPage;
