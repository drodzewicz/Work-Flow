import React, { useMemo } from "react";

import BoardContainer from "@/components/board/BoardContainer";
import useBoolean from "@/hooks/useBoolean";
import usePagination from "@/hooks/usePagination";
import useSearchFilter from "@/hooks/useSearchFilter";
import { useGetUserBoards, useGetUserPinnedBoards, useTogglePinBoard } from "@/service/self";
import { FaColumns, FaPlus } from "react-icons/fa";
import CreateNewBoardDialog from "./CreateNewBoardDialog";
import usePaginationPageCount from "@/hooks/usePaginationPageCount";
import AsyncSearch from "@/components/form/AsyncSearch";

type UserBoardProps = {
    searchTerm: string;
    currentPage: number;
    limit: number;
};

const useUserBoards = ({ searchTerm, limit, currentPage }: UserBoardProps) => {
    const { data: pinnedBoards = [] } = useGetUserPinnedBoards();

    const { data: boardData = { boards: [], totalCount: 0 }, isLoading } = useGetUserBoards({
        limit,
        page: currentPage,
        boardName: searchTerm,
        keepPreviousData: true,
    });

    const boardsWithMetaData = useMemo(() => {
        return boardData.boards.map((board) => {
            const isPinned = !!pinnedBoards.find((pinnedBoard) => pinnedBoard._id === board._id);
            return { ...board, isPinned };
        });
    }, [boardData.boards, pinnedBoards]);

    return { boards: boardsWithMetaData, isLoading, totalCount: boardData.totalCount };
};

const AllUserBoardsSection: React.FC = () => {
    const {
        state: showCreateNewBoardDialog,
        setTrue: openCreateNewBoardModal,
        setFalse: closeCreateNewBoardModal,
    } = useBoolean(false);

    const { searchTerm, search, clear } = useSearchFilter("");

    const { currentPage, limit, setCurrentPage, reset } = usePagination({
        initialPage: 1,
        limit: 8,
    });

    const { boards, isLoading, totalCount } = useUserBoards({ searchTerm, currentPage, limit });

    const totalPages = usePaginationPageCount({ limit, totalItems: totalCount })

    const { mutate: togglePinBoard } = useTogglePinBoard();

    const searchBoards = (username: string) => {
        reset();
        search(username);
    };

    return (
        <div className="board-container-section">
            <div className="board-container-header">
                <h1 className="board-container-title">
                    <FaColumns className="board-container-title__icon" /> Boards
                </h1>
                <div className="board-table-utils">
                    <AsyncSearch
                        className="board-search"
                        placeholder="Search boards..."
                        hideDropdown
                        showSelectedValues={false}
                        filterOptions={false}
                        hideSelectedOptions={false}
                        debounceCallback={searchBoards}
                        onClearSelection={clear}
                        isInputClearable={false}
                    />
                    <button onClick={openCreateNewBoardModal} className="btn new-board-btn">
                        <div className="new-board-btn__text">New Board</div>
                        <FaPlus className="new-board-btn__icon" />
                    </button>
                </div>
            </div>
            <hr className="break-line" />
            <BoardContainer
                isLoading={isLoading}
                numberOfLoadingItems={limit}
                className="board-dashboard__main"
                noBoardsMessage="you are not a part of any board"
                boards={boards}
                changePage={setCurrentPage}
                togglePinBoard={togglePinBoard}
                page={{
                    current: currentPage,
                    total: totalPages,
                }}
            />
            <CreateNewBoardDialog
                show={showCreateNewBoardDialog}
                close={closeCreateNewBoardModal}
            />
        </div>
    );
};

export default AllUserBoardsSection;
