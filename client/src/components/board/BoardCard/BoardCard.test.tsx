import { render, screen } from "@testing-library/react";
import useEvent from "@testing-library/user-event";
import BoardCard from "./BoardCard";
import { allProviders } from "@/test/utils";

describe("Test Component - BoardCard", () => {
  const testBoard = {
    id: "board_id_1",
    boardName: "Test noard 1",
  };

  it("should render board title", () => {
    render(<BoardCard boardId={testBoard.id} boardName={testBoard.boardName} />, {
      wrapper: allProviders,
    });
    expect(screen.getByRole("heading", { name: testBoard.boardName })).toBeInTheDocument();
  });

  it("should render pin button with status unpinned", () => {
    render(<BoardCard boardId={testBoard.id} boardName={testBoard.boardName} isPinned={false} />, {
      wrapper: allProviders,
    });
    const pinButtonElement = screen.getByTestId("pin-btn");

    expect(pinButtonElement).toBeInTheDocument();
    expect(pinButtonElement).toHaveAttribute("aria-label", "unpinned");
  });

  it("should render pin button with status pinned", () => {
    render(<BoardCard boardId={testBoard.id} boardName={testBoard.boardName} isPinned={true} />, {
      wrapper: allProviders,
    });
    const pinButtonElement = screen.getByTestId("pin-btn");

    expect(pinButtonElement).toBeInTheDocument();
    expect(pinButtonElement).toHaveAttribute("aria-label", "pinned");
  });

  it("should call togglePinCallback when clicked on pin button", async () => {
    const togglePinCallbackMock = vi.fn();

    render(
      <BoardCard
        boardId={testBoard.id}
        boardName={testBoard.boardName}
        pinBoard={togglePinCallbackMock}
      />,
      {
        wrapper: allProviders,
      },
    );
    const pinButtonElement = screen.getByTestId("pin-btn");

    await useEvent.click(pinButtonElement);

    expect(togglePinCallbackMock).toHaveBeenCalledOnce();
  });
});
