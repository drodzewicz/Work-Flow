import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AsyncInput from "./AsyncInput";

describe("Test Component - AsyncInput", () => {
  it("should display loading spinner when isLoading is toggled", () => {
    const { rerender } = render(<AsyncInput />);
    expect(screen.queryByTestId("async-input-loading")).not.toBeInTheDocument();

    rerender(<AsyncInput isLoading />);
    expect(screen.getByTestId("async-input-loading")).toBeInTheDocument();
  });

  it("should display loading spinner when user is typing", async () => {
    const inputText = "test string";

    render(<AsyncInput debounceTime={500} />);
    const asyncInputElement = screen.getByRole("textbox");

    expect(screen.queryByTestId("async-input-loading")).not.toBeInTheDocument();

    await userEvent.type(asyncInputElement, inputText);
    expect(screen.getByTestId("async-input-loading")).toBeInTheDocument();
  });

  it("should not display loading spinner after user has stopped typing for more than specified in debounceTime", async () => {
    const inputText = "test string";

    render(<AsyncInput debounceTime={500} />);
    const asyncInputElement = screen.getByRole("textbox");

    expect(screen.queryByTestId("async-input-loading")).not.toBeInTheDocument();

    await userEvent.type(asyncInputElement, inputText);
    await waitForElementToBeRemoved(screen.queryByTestId("async-input-loading"));

    expect(screen.queryByTestId("async-input-loading")).not.toBeInTheDocument();
  });

  it("should call debounce callback once with final input string", async () => {
    const inputText = "test string";
    const searchMock = vi.fn();

    render(<AsyncInput debounceCallback={searchMock} debounceTime={500} />);
    const asyncInputElement = screen.getByRole("textbox");

    expect(screen.queryByTestId("async-input-loading")).not.toBeInTheDocument();

    await userEvent.type(asyncInputElement, inputText);
    await waitForElementToBeRemoved(screen.queryByTestId("async-input-loading"));

    expect(searchMock).toHaveBeenCalledWith(inputText);
    expect(searchMock).toHaveBeenCalledOnce();
  });
});
