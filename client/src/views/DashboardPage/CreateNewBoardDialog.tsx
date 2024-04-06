import Modal from "@/components/layout/Modal";
import BoardEditor from "@/dialogs/BoardEditor";
import { BoardEditorType } from "@/dialogs/BoardEditor/BoardEditor";
import useRedirect from "@/hooks/useRedirect";
import { useCreateBoard } from "@/service/board";
import { OnSubmitType } from "@/types/utils";
import React from "react";

type CreateNewBoardDialogProps = {
    show: boolean;
    close: () => void;
};

const CreateNewBoardDialog: React.FC<CreateNewBoardDialogProps> = ({ show, close }) => {
    const { goTo } = useRedirect();

    const { mutate: createBoard } = useCreateBoard({
        onSuccess: (response) => {
            goTo.board(response._id);
        },
    });

    const createBoardHandler: OnSubmitType<BoardEditorType> = async (values) => {
        createBoard({ name: values.name, description: values.description || "" });
    };

    return (
        <Modal show={show} title="Create new Board" size="s" onClose={close}>
            <BoardEditor onSubmit={createBoardHandler} />
        </Modal>
    );
};

export default CreateNewBoardDialog;
