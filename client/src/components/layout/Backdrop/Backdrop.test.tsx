import { fireEvent, render, screen } from "@testing-library/react";
import Backdrop from "./Backdrop";

describe("Test Component - Backdrop", () => {
  it("should be visible", () => {
    render(<Backdrop show />);
    const backdrop = screen.getByRole("presentation");

    expect(backdrop).toBeVisible();
  });

  it("should not be visible", () => {
    render(<Backdrop show={false} />);
    const backdrop = screen.getByRole("presentation");

    expect(backdrop).not.toBeVisible();
  });

  it("should apply custom opacity", () => {
    const opacity = 0.7;
    render(<Backdrop show opacity={opacity} />);
    const backdrop = screen.getByRole("presentation");

    expect(backdrop).toHaveStyle({ opacity });
  });

  it("should trigger onClick when clicked on component", () => {
    const clickMock = vi.fn();

    render(<Backdrop show onClick={clickMock} />);
    const backdrop = screen.getByRole("presentation");
    fireEvent.click(backdrop);

    expect(clickMock).toHaveBeenCalled();
  });
});
