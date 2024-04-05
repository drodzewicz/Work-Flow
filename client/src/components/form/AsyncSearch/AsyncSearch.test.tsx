import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AsyncSearch from "./AsyncSearch";
import { OptionType } from "./SearchOptionType";

const options: OptionType[] = [
    { id: "1", label: "one", disabled: false },
    { id: "2", label: "two", disabled: false },
    { id: "3", label: "three", disabled: false },
    { id: "4", label: "four", disabled: false },
];

describe("Test Component - AsyncSearch", () => {
    it("should render search icon on idle search", () => {
        render(<AsyncSearch options={options} />);

        expect(screen.getByTestId("async-search-icon")).toBeInTheDocument();
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

        expect(screen.getByTestId("async-clear-icon")).toBeInTheDocument();

        rerender(<AsyncSearch showSearchIcon={false} options={options} />);

        await userEvent.type(searchInputElement, "test");

        expect(screen.getByTestId("async-clear-icon")).toBeInTheDocument();
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

        expect(screen.getByTestId("async-search-dropdown")).toBeInTheDocument();
    });

    it("should not let user input value when isSearchableis disabled", async () => {
        const textValue = "test value";

        render(<AsyncSearch options={options} isSearchable={false} />);

        const searchInputElement = screen.getByRole("textbox");
        await userEvent.type(searchInputElement, textValue);

        expect(searchInputElement).toHaveValue("");
        expect(screen.queryByTestId("async-clear-icon")).not.toBeInTheDocument();
        expect(screen.getByTestId("async-search-icon")).toBeInTheDocument();
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

    it("should show \"clear selections\" option in the dropdown when there are selected options", async () => {
        const selectoption = options[1];

        render(<AsyncSearch options={options} selectedOptions={[selectoption]} />);

        await userEvent.click(screen.getByRole("textbox"));

        expect(screen.getByTestId("async-search-clear-selections")).toBeInTheDocument();
    });

    it("should not show \"clear selections\" option in the dropdown when isClearable is false", async () => {
        const selectoption = options[1];

        render(
            <AsyncSearch options={options} selectedOptions={[selectoption]} isClearable={false} />
        );

        await userEvent.click(screen.getByRole("textbox"));

        expect(screen.queryByTestId("async-search-clear-selections")).not.toBeInTheDocument();
    });

    it("should not show selected options in the dropdown when hideSelectedOptions is set to false", async () => {
        const selectoption = options[1];

        render(
            <AsyncSearch
                options={options}
                selectedOptions={[selectoption]}
                hideSelectedOptions={true}
            />
        );

        await userEvent.click(screen.getByRole("textbox"));

        expect(screen.queryByText(selectoption.label)).not.toBeInTheDocument();
    });

    it("should show selected options in the dropdown when hideSelectedOptions is set to true", async () => {
        const selectoption = options[0];

        render(
            <AsyncSearch
                options={options}
                selectedOptions={[selectoption]}
                hideSelectedOptions={false}
            />
        );

        await userEvent.click(screen.getByRole("textbox"));

        expect(screen.getByText(selectoption.label)).toBeInTheDocument();
    });

    // FIXME
    it.skip("should render filtered options containing typed in substring", async () => {
        const simmilarSubstring = "simmilar";

        const option_1 = { id: "test_1", label: `${simmilarSubstring} one` };
        const option_2 = { id: "test_2", label: `${simmilarSubstring} two` };

        const optionsWithCommonString = structuredClone(options);
        optionsWithCommonString.push(option_1);
        optionsWithCommonString.push(option_2);

        render(
            <AsyncSearch
                debounceTime={100}
                options={optionsWithCommonString}
                filterOptions={true}
            />
        );

        const inputElement = screen.getByRole("textbox");

        await userEvent.click(inputElement);
        await userEvent.type(inputElement, simmilarSubstring);
        // await waitForElementToBeRemoved(screen.queryByTestId("async-input-loading"));

        // const optionItems = screen.queryAllByTestId("async-search-option");
        screen.debug(screen.getByTestId("async-search-dropdown"));
        // expect(optionItems).toHaveLength(2);
    });

    it("should render custom options", async () => {
        const customString = "custom string";
        const renderComponent = (props: OptionType) => (
            <div>{`${customString} ${props.label}`}</div>
        );

        render(<AsyncSearch options={options} renderOption={renderComponent} />);
        await userEvent.click(screen.getByRole("textbox"));

        const optionItems = screen.queryAllByTestId("async-search-option");

        expect(optionItems).toHaveLength(options.length);

        optionItems.forEach((optionElement, index) => {
            expect(optionElement).toHaveTextContent(`${customString} ${options[index].label}`);
        });
    });

    it("should close dropdown on option select", async () => {
        render(<AsyncSearch options={options} closeDropdownOnOptionClick={true} />);
        await userEvent.click(screen.getByRole("textbox"));

        expect(screen.getByTestId("async-search-dropdown")).toBeInTheDocument();

        await userEvent.click(screen.getByText(options[0].label));

        expect(screen.queryByTestId("async-search-dropdown")).not.toBeInTheDocument();
    });

    it("should not close dropdown on option select", async () => {
        render(<AsyncSearch options={options} closeDropdownOnOptionClick={false} />);
        await userEvent.click(screen.getByRole("textbox"));

        expect(screen.getByTestId("async-search-dropdown")).toBeInTheDocument();

        await userEvent.click(screen.getByText(options[0].label));

        expect(screen.getByTestId("async-search-dropdown")).toBeInTheDocument();
    });
});
