import React from "react";

import { useParams } from "react-router-dom";

import Modal from "@/components/layout/Modal";

import TaskDisplay from "@/dialogs/TaskDisplay";
import useRedirect from "@/hooks/useRedirect";

const TaskDisplayPage: React.FC = () => {
    const { goTo } = useRedirect();

    const { id: boardId = "", taskId = "" } = useParams<{ id: string; taskId: string }>();

    const closeModalHandler = () => {
        goTo.board(boardId);
    };

    return (
        <Modal show title="" size="l" onClose={closeModalHandler}>
            <TaskDisplay taskId={taskId} closeModal={closeModalHandler} />
        </Modal>
    );
};

export default TaskDisplayPage;
