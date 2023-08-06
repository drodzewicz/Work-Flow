import React from "react";

import { BoardPageProps } from "./types";

import { DragDropContext } from "react-beautiful-dnd";
import { FaUsers, FaTags, FaCog } from "react-icons/fa";
import { useParams } from "react-router-dom";

import useModal from "@/hooks/useModal";

import useGetBoard from "@/service/useGetBoard";

import Button from "@/components/general/Button";
import ExpandText from "@/components/general/ExpandText";

import LoadingOverlay from "@/components/layout/LoadingOverlay/LoadingOverlay";
import Modal from "@/components/layout/Modal";

import BoardMembers from "@/dialogs/BoardMembers/BoardMembers";

import "./BoardPage-dark.scss";
import "./BoardPage.scss";

import TaskBoard from "./TaskBoard";

// import { onDragEnd } from "./dragHelper";

const BoardPage: React.FC<BoardPageProps> = () => {
  const params = useParams<{ id: string }>();
  const { show: showMembersModal, open: openMembersModal, close: closeMembersModal } = useModal();

  const { isLoading, data: board } = useGetBoard({ boardId: params.id });

  return (
    <LoadingOverlay show={isLoading} opacity={0} className="task-loading">
      <>
        <div className="board-page">
          <ExpandText className="board-page__title" title={board?.name}>
            <p>{board?.description}</p>
          </ExpandText>
          <div className="board-page__controlls">
            <Button onClick={openMembersModal}>
              <FaUsers />
              <span>Peolpe</span>
            </Button>
            <Button
            // onClick={openBoardTagsModal}
            >
              <FaCog />
              <span>Settings</span>
            </Button>
          </div>
          <hr className="break-line" style={{ width: "100%" }} />
          <DragDropContext
            onDragEnd={(result) => 1}
            // onDragEnd={(result) => onDragEnd(boardId, result, tasksState, tasksDispatch)}
          >
            <TaskBoard columns={board?.columns} />
          </DragDropContext>
        </div>
        <Modal show={showMembersModal} title="Members" size="s" onClose={closeMembersModal}>
          <BoardMembers boardId={board?._id} />
        </Modal>
      </>
    </LoadingOverlay>
  );
};

export default BoardPage;
