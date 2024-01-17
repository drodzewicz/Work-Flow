import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

describe("Test Component - Modal", () => {
  const onCloseMock = vi.fn();

  it("should have header title", () => {
    const title = "Modal test title";
    render(<Modal onClose={onCloseMock} show title={title}></Modal>);

    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
  });

  it("should have close button in header", () => {
    render(<Modal onClose={onCloseMock} show title="Modal test title"></Modal>);

    expect(screen.getByRole("button", { name: "close" })).toBeInTheDocument();
  });

  it("should render content inside Modal", () => {
    const modalContent = "Modal content test text";
    render(
      <Modal onClose={onCloseMock} show title="Modal test title">
        <div>{modalContent}</div>
      </Modal>,
    );
    const modalElement = screen.getByRole("dialog");
    expect(modalElement).toContainHTML(`<div>${modalContent}</div>`);
  });

  it("should trigger onClose when clicked on backdrop", async () => {
    render(<Modal onClose={onCloseMock} show title="Modal test title"></Modal>);

    const backdrop = screen.getByRole("presentation", { name: "backdrop" });
    await userEvent.click(backdrop);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
