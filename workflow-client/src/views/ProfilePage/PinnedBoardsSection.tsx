import React, { useMemo } from "react";

import { ReactComponent as Pined } from "@/assets/images/pin-full.svg";

import { useGetUserPinnedBoards, useTogglePinBoard } from "@/service/self";

import BoardContainer from "@/components/board/BoardContainer";

const PinnedBoardsSection = () => {
  const { data: pinnedBoards = [], isLoading: isPinnedBoardLoading } = useGetUserPinnedBoards();
  const { mutate: togglePinBoard } = useTogglePinBoard();

  const pinnedBoardsWithMetaData = useMemo(() => {
    return pinnedBoards.map((board) => ({ ...board, isPinned: true })) ?? [];
  }, [pinnedBoards]);

  return (
    <section className="profile-page__pinned-boards">
      <h1>
        <Pined /> Pinned Boards
      </h1>
      <hr className="break-line" />
      <BoardContainer
        className="profile-page__pinned-boards__container"
        noBoardsMessage="you have no pinned boards"
        boards={pinnedBoardsWithMetaData}
        togglePinBoard={togglePinBoard}
        numberOfLoadingItems={4}
        isLoading={isPinnedBoardLoading}
      />
    </section>
  );
};

export default PinnedBoardsSection;
