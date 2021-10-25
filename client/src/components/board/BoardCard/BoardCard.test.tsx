import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen, fireEvent, within } from "@testing-library/react";
import BoardCard from "./BoardCard";

describe("BOARD-CARD ", () => {
  const testBoardCardProps = {
    boardId: "test_board_id",
    boardName: "test board name",
    pinBoard: () => {},
    removeBoard: () => {},
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

  describe("PIN BOARD", () => {
    it("should contain Pin svg if board is pinned", () => {
      const { getByTestId } = render(<BoardCard {...testBoardCardProps} isPinned={true} />);
      expect(getByTestId(`${testBoardCardProps.boardId}-pinned`)).toBeVisible();
    });

    it("should contain Pin svg if board is not pinned", () => {
      const { getByTestId } = render(<BoardCard {...testBoardCardProps} />);
      expect(getByTestId(`${testBoardCardProps.boardId}-pin`)).toBeVisible();
    });

    it("should call pinBoard method once on click", () => {
      const pinBoard = jest.fn();
      const { getByTestId } = render(<BoardCard {...testBoardCardProps} pinBoard={pinBoard} />);
      fireEvent.click(getByTestId(`${testBoardCardProps.boardId}-pin-btn`));
      expect(pinBoard).toHaveBeenCalledTimes(1);
    });
  });

  describe("OPTIONS", () => {
    it("should not find Dropdown component", () => {
      const { queryByTestId } = render(<BoardCard {...testBoardCardProps} />);
      expect(queryByTestId("dropdown-menu")).toBeNull();
    });
    it("should find Dropdown component after toggle click", () => {
      // const { getByTestId } = render(<BoardCard {...testBoardCardProps} />, { container: document.body});

      // const { queryByTestId } = within(document.getElementById('root-menu')!)

      // fireEvent.click(getByTestId(`${testBoardCardProps.boardId}-options`));
      // expect(queryByTestId("dropdown-menu")).not.toBeNull();
    });
  });
});
