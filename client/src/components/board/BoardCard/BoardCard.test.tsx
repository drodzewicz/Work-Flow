import { screen } from "@testing-library/react";
import useEvent from "@testing-library/user-event";
import BoardCard from "./BoardCard";
import { BrowerRouterWrapper, renderWithWrappers } from "@/test/utils";
import { boards } from "@/test/mocks/data";

describe("Test Component - BoardCard", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const render = renderWithWrappers([BrowerRouterWrapper]);

    const testBoard = boards[0];

    it("should render board title", () => {
        render(<BoardCard boardId={testBoard._id} boardName={testBoard.name} />);
        expect(screen.getByRole("heading", { name: testBoard.name })).toBeInTheDocument();
    });

    it("should render pin button with status unpinned", () => {
        render(<BoardCard boardId={testBoard._id} boardName={testBoard.name} isPinned={false} />);
        const pinButtonElement = screen.getByTestId("pin-btn");

        expect(pinButtonElement).toBeInTheDocument();
        expect(pinButtonElement).toHaveAttribute("aria-label", "unpinned");
    });

    it("should render pin button with status pinned", () => {
        render(<BoardCard boardId={testBoard._id} boardName={testBoard.name} isPinned={true} />);
        const pinButtonElement = screen.getByTestId("pin-btn");

        expect(pinButtonElement).toBeInTheDocument();
        expect(pinButtonElement).toHaveAttribute("aria-label", "pinned");
    });

    it("should call togglePinCallback when clicked on pin button", async () => {
        const togglePinCallbackMock = vi.fn();

        render(
            <BoardCard
                boardId={testBoard._id}
                boardName={testBoard.name}
                pinBoard={togglePinCallbackMock}
            />
        );
        const pinButtonElement = screen.getByTestId("pin-btn");

        await useEvent.click(pinButtonElement);

        expect(togglePinCallbackMock).toHaveBeenCalledOnce();
    });
});
