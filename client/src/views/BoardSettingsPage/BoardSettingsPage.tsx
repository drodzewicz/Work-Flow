import React from "react";

import { Link, useNavigate } from "react-router-dom";

import useBoardId from "@/hooks/useBoardId";
import useRBAC from "@/hooks/useRBAC";

import { useDeleteBoard, useLeaveBoard } from "@/service/board";
import { useSearchBoardMembers } from "@/service/member";

import Box from "@/components/layout/Box";

import "./BoardSettingsPage.scss";

import GeneralSection from "./GeneralSection";
import MembersSection from "./MembersSection";
import RoleSection from "./RoleSection";
import TagSection from "./TagSection";

const BoardSettingsPage: React.FC = () => {
  const boardId = useBoardId();
  const navigate = useNavigate();

  const { hasAccess: canDeleteBoard } = useRBAC({ boardId, action: "BOARD_DELETE" });
  const { hasAccess: canModifyRoles } = useRBAC({ boardId, action: "MEMBER_ROLE_UPDATE" });

  const { data = { totalCount: 0 } } = useSearchBoardMembers({
    boardId,
    limit: 5,
    page: 1,
  });

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
    const shouldDelete = window.confirm("Are you sure you want to delete this board?");
    if (shouldDelete) {
      deleteBoard(boardId);
    }
  };

  const leaveBoardHandler = () => {
    if (data.totalCount === 1) {
      const lastMemberAlert = window.confirm(
        "You are the last member of the board, board will be deleted after you leave.",
      );
      if (!lastMemberAlert) {
        return;
      }
    }
    const shouldDelete = window.confirm("Are you sure you want to leave this board?");
    if (shouldDelete) {
      leaveBoard(boardId);
    }
  };

  const settingsSections: { title: string; PageComponent: React.FC; show: boolean }[] = [
    { title: "General", PageComponent: GeneralSection, show: true },
    { title: "User Roles", PageComponent: RoleSection, show: canModifyRoles },
    { title: "Members", PageComponent: MembersSection, show: true },
    { title: "Tags", PageComponent: TagSection, show: true },
  ];

  return (
    <Box className="board-settings-page">
      <header className="board-settings-page__header">
        <button id="back-to-board-btn" className="btn">
          <Link to={`/board/${boardId}`}>back to board</Link>
        </button>
        <button id="leave-board-btn" onClick={leaveBoardHandler} className="btn">
          Leave board
        </button>
        {canDeleteBoard && (
          <button id="delete-board-btn" onClick={deleteBoardHandler} className="btn btn--glow">
            Delete Board
          </button>
        )}
      </header>
      {settingsSections
        .filter(({ show }) => show)
        .map(({ title, PageComponent }) => (
          <section aria-label={title} key={title}>
            <h1 className="board-settings-page__section-title">{title}</h1>
            <hr className="break-line" />
            <PageComponent />
          </section>
        ))}
    </Box>
  );
};

export default BoardSettingsPage;
