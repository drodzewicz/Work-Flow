import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AsyncSearch from "./AsyncSearch";

const options = [
  { id: "1", label: "one", disabled: false },
  { id: "2", label: "two", disabled: false },
  { id: "3", label: "three", disabled: false },
  { id: "4", label: "four", disabled: false },
];

describe("Test Component - AsyncSearch", () => {
  it("should render search icon on idle search", () => {
    render(<AsyncSearch options={options} />);

    expect(screen.queryByTestId("async-search-icon")).toBeInTheDocument();
  });

  it("should not render search icon on idle search", () => {
    render(<AsyncSearch showSearchIcon={false} options={options} />);

    expect(screen.queryByTestId("async-search-icon")).not.toBeInTheDocument();
  });

  it("should not render search icon when user has entered value", async () => {
    render(<AsyncSearch options={options} />);

    const searchInputElement = screen.getByRole("textbox");
    await userEvent.type(searchInputElement, "test");

    expect(screen.queryByTestId("async-search-icon")).not.toBeInTheDocument();
  });

  it("should render clear icon when user has entered value", async () => {
    const { rerender } = render(<AsyncSearch showSearchIcon={true} options={options} />);

    const searchInputElement = screen.getByRole("textbox");
    await userEvent.type(searchInputElement, "test");

    expect(screen.queryByTestId("async-clear-icon")).toBeInTheDocument();

    rerender(<AsyncSearch showSearchIcon={false} options={options} />);

    await userEvent.type(searchInputElement, "test");

    expect(screen.queryByTestId("async-clear-icon")).toBeInTheDocument();
  });

  // FIXME fix component
  it.skip("should clear input value when clicked on clar button", async () => {
    const textValue = "test value";

    render(<AsyncSearch options={options} />);

    const searchInputElement = screen.getByRole("textbox");
    await userEvent.type(searchInputElement, textValue);

    expect(searchInputElement).toHaveValue(textValue);

    const clearButtonElement = screen.getByTestId("async-clear-icon");
    await userEvent.click(clearButtonElement);

    expect(searchInputElement).toHaveValue("");
  });

  it("should open a dropdown with options when clicking on the input", async () => {
    render(<AsyncSearch options={options} />);

    expect(screen.queryByTestId("async-search-dropdown")).not.toBeInTheDocument();

    const asyncSearchElement = screen.getByRole("textbox");
    await userEvent.click(asyncSearchElement);

    expect(screen.queryByTestId("async-search-dropdown")).toBeInTheDocument();
  });

  it("should not let user input value when isSearchableis disabled", async () => {
    const textValue = "test value";

    render(<AsyncSearch options={options} isSearchable={false} />);

    const searchInputElement = screen.getByRole("textbox");
    await userEvent.type(searchInputElement, textValue);

    expect(searchInputElement).toHaveValue("");
    expect(screen.queryByTestId("async-clear-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("async-search-icon")).toBeInTheDocument();
  });

  it("should call onSelect callback on option click", async () => {
    const selectoption = options[1];
    const onSelectCallbackMock = vi.fn();

    render(<AsyncSearch options={options} onSelect={onSelectCallbackMock} />);

    const searchInputElement = screen.getByRole("textbox");
    await userEvent.click(searchInputElement);

    await userEvent.click(screen.getByText(selectoption.label));

    expect(onSelectCallbackMock).toHaveBeenCalledWith(selectoption);
  });

  it("should not call onSelect callback on disabled option click", async () => {
    const optionsWithDisabled = structuredClone(options);
    optionsWithDisabled[1].disabled = true;
    const selectoption = optionsWithDisabled[1];

    const onSelectCallbackMock = vi.fn();

    render(<AsyncSearch options={optionsWithDisabled} onSelect={onSelectCallbackMock} />);

    const searchInputElement = screen.getByRole("textbox");
    await userEvent.click(searchInputElement);

    await userEvent.click(screen.getByText(selectoption.label));

    expect(onSelectCallbackMock).not.toHaveBeenCalled();
  });

  it('should show "clear selections" option in the dropdown when there are selected options', async () => {
    const selectoption = options[1];

    render(<AsyncSearch options={options} selectedOptions={[selectoption]} />);

    await userEvent.click(screen.getByRole("textbox"));

    expect(screen.queryByTestId("async-search-clear-selections")).toBeInTheDocument();
  });
});
