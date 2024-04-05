import React from "react";

import { useNavigate, useParams } from "react-router-dom";

import Modal from "@/components/layout/Modal";

import TaskDisplay from "@/dialogs/TaskDisplay";

const TaskDisplayPage: React.FC = () => {
    const { id: boardId = "", taskId = "" } = useParams<{ id: string; taskId: string }>();

    const closeModalHandler = () => {
        navigate(`/board/${boardId}`);
    };

    const navigate = useNavigate();
    return (
        <Modal show title="" size="l" onClose={closeModalHandler}>
            <TaskDisplay taskId={taskId} closeModal={closeModalHandler} />
        </Modal>
    );
};

export default TaskDisplayPage;
