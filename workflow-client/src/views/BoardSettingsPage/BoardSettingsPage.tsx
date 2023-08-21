import React from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import useDeleteBoard from "@/service/useDeleteBoard";
import useLeaveBoard from "@/service/useLeaveBoard";

import Box from "@/components/layout/Box";

import GeneralSections from "./GeneralSections";
import MembersSection from "./MembersSection";
import RoleSections from "./RoleSections";

const BoardSettingsPage: React.FC = () => {
  const { id: boardId = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
        <button onClick={deleteBoardHandler} className="btn">
          Delete Board
        </button>
      </div>
      <GeneralSections />
      <RoleSections />
      <MembersSection />
    </Box>
  );
};

export default BoardSettingsPage;
