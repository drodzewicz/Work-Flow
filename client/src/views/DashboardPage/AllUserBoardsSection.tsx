import React, { useEffect, useMemo } from "react";

import BoardContainer from "@/components/board/BoardContainer";
import AsyncInput from "@/components/form/AsyncInput";
import Modal from "@/components/layout/Modal";
import BoardEditor from "@/dialogs/BoardEditor";
import { BoardEditorType } from "@/dialogs/BoardEditor/BoardEditor";
import useBoolean from "@/hooks/useBoolean";
import usePagination from "@/hooks/usePagination";
import useSearchFilter from "@/hooks/useSearchFilter";
import { useGetUserBoards, useGetUserPinnedBoards, useTogglePinBoard } from "@/service/self";
import { OnSubmitType } from "@/types/utils";
import { FaColumns, FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import { useCreateBoard } from "@/service/board";
import useRedirect from "@/hooks/useRedirect";

const AllUserBoardsSection: React.FC = () => {
    const { goTo } = useRedirect();

    const {
        state: showCreateNewBoardDialog,
        setTrue: openCreateNewBoardModal,
        setFalse: closeCreateNewBoardModal,
    } = useBoolean(false);

    const { data: pinnedBoards = [] } = useGetUserPinnedBoards();

    const { currentPage, totalPages, limit, setCurrentPage, setTotalItems, reset } = usePagination({
        initialPage: 1,
        limit: 8,
    });

    const { searchTerm, search, clear } = useSearchFilter("");

    const { data: boardData = { boards: [], totalCount: 0 }, isLoading: isBoardLoading } =
        useGetUserBoards({
            limit,
            page: currentPage,
            boardName: searchTerm,
            keepPreviousData: true,
        });

    useEffect(() => {
        setTotalItems(boardData?.totalCount ?? 0);
    }, [boardData?.totalCount]);

    const { mutate: createBoard } = useCreateBoard({
        onSuccess: (response) => {
            goTo.board(response._id);
        },
    });

    const { mutate: togglePinBoard } = useTogglePinBoard();

    const searchBoards = (username: string) => {
        reset();
        search(username);
    };

    const boardsWithMetaData = useMemo(() => {
        return boardData.boards.map((board) => {
            const isPinned = !!pinnedBoards.find((pinnedBoard) => pinnedBoard._id === board._id);
            return { ...board, isPinned };
        });
    }, [boardData.boards, pinnedBoards]);

    const createBoardHandler: OnSubmitType<BoardEditorType> = async (values) => {
        createBoard({ name: values.name, description: values.description || "" });
    };

    return (
        <div className="board-container-section">
            <div className="board-container-header">
                <h1 className="board-container-title">
                    <FaColumns className="board-container-title__icon" /> Boards
                </h1>
                <div className="board-table-utils">
                    <AsyncInput
                        placeholder="Search boards..."
                        debounceCallback={searchBoards}
                        value={searchTerm}
                        isLoading={!!searchTerm && isBoardLoading}
                        debounceTime={500}
                    >
                        {!searchTerm && <FaSearch className="async-input__search-icon" />}
                        {searchTerm && (
                            <FaTimes className="async-input__search-icon" onClick={clear} />
                        )}
                    </AsyncInput>
                    <button onClick={openCreateNewBoardModal} className="btn new-board-btn">
                        <div className="new-board-btn__text">New Board</div>
                        <FaPlus className="new-board-btn__icon" />
                    </button>
                </div>
            </div>
            <hr className="break-line" />
            <BoardContainer
                isLoading={isBoardLoading}
                numberOfLoadingItems={limit}
                className="board-dashboard__main"
                noBoardsMessage="you are not a part of any board"
                boards={boardsWithMetaData}
                changePage={setCurrentPage}
                togglePinBoard={togglePinBoard}
                page={{
                    current: currentPage,
                    total: totalPages,
                }}
            />
            <Modal
                show={showCreateNewBoardDialog}
                title="Create new Board"
                size="s"
                onClose={closeCreateNewBoardModal}
            >
                <BoardEditor onSubmit={createBoardHandler} />
            </Modal>
        </div>
    );
};

export default AllUserBoardsSection;
