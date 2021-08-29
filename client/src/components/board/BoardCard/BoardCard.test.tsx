import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from "@testing-library/react";
import BoardCard from "./BoardCard";

describe("BOARD-CARD ", () => {
  const testBoardCardProps = {
    boardId: "test_board_id",
    boardName: "test board name",
    pinBoard: () => {},
    removeBoard: (boardId: string) => {},
    isPinned: false,
    isAuthor: false,
  };
  it("should render component", () => {
    render(<BoardCard {...testBoardCardProps} />);

    const BoardCardElement = screen.getByTestId(testBoardCardProps.boardId);
    expect(BoardCardElement).toBeInTheDocument();
  });

  it("should contain board title", () => {
    const { getByText } = render(<BoardCard {...testBoardCardProps} />);
    expect(getByText(testBoardCardProps.boardName)).toBeVisible();
  });

  it("should contain Pin svg if board is pinned", () => {
    const { getByTestId } = render(<BoardCard {...testBoardCardProps} isPinned={true} />);
    expect(getByTestId(`${testBoardCardProps.boardId}-pinned`)).toBeVisible();
  });
  
  it("should contain Pin svg if board is not pinned", () => {
    const { getByTestId } = render(<BoardCard {...testBoardCardProps} />);
    expect(getByTestId(`${testBoardCardProps.boardId}-pin`)).toBeVisible();
  });
});
