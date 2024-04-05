import React, { useMemo } from "react";
import { ReactComponent as Pined } from "@/assets/images/pin-full.svg";
import BoardContainer from "@/components/board/BoardContainer";
import { useGetUserPinnedBoards, useTogglePinBoard } from "@/service/self";

const PinnedBoardsSection: React.FC = () => {
    const { data: pinnedBoards = [], isLoading: isPinnedBoardLoading } = useGetUserPinnedBoards();

    const pinnedBoardsWithMetaData = useMemo(() => {
        return pinnedBoards.map((board) => ({ ...board, isPinned: true })) ?? [];
    }, [pinnedBoards]);

    const { mutate: togglePinBoard } = useTogglePinBoard();

    if (!pinnedBoards) {
        return null;
    }

    return (
        <div className="board-container-section">
            <h1 className="board-container-title">
                <Pined className="board-container-title__icon" /> Pinned
            </h1>
            <hr className="break-line" />
            <BoardContainer
                className="board-dashboard__pinned"
                noBoardsMessage="you have no pinned boards"
                boards={pinnedBoardsWithMetaData}
                togglePinBoard={togglePinBoard}
                numberOfLoadingItems={4}
                isLoading={isPinnedBoardLoading}
            />
        </div>
    );
};

export default PinnedBoardsSection;
