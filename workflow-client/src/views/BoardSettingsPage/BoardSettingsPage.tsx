import React from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import useRBAC from "@/hooks/useRBAC";

import useDeleteBoard from "@/service/board/useDeleteBoard";
import useLeaveBoard from "@/service/board/useLeaveBoard";

import Box from "@/components/layout/Box";

import GeneralSections from "./GeneralSections";
import MembersSection from "./MembersSection";
import RoleSections from "./RoleSections";

const BoardSettingsPage: React.FC = () => {
  const { id: boardId = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const canDeleteBoard = useRBAC({ boardId, action: "BOARD_DELETE" });
  const canModifyRoles = useRBAC({ boardId, action: "MEMBER_ROLE_UPDATE" });

  const { mutate: deleteBoard } = useDeleteBoard({
    onSuceess: () => {
      navigate("/dashboard");
    },
  });

  const { mutate: leaveBoard } = useLeaveBoard({
    onSuceess: () => {
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
      <GeneralSections />
      {canModifyRoles && <RoleSections />}
      <MembersSection />
    </Box>
  );
};

export default BoardSettingsPage;
