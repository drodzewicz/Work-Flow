import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewColumn from "./NewColumn";
import { renderWithWrappers, ReactQueryWrapper } from "@/test/utils";

describe("Test Component - NewColumn", () => {
  const render = renderWithWrappers([ReactQueryWrapper]);

  it("should let user enter 20 characters", async () => {
    render(<NewColumn />);
    const inputElement = screen.getByRole("textbox");

    const inputString = Array.from(Array(30).keys()).join("").substring(0, 20);
    await userEvent.type(inputElement, inputString);

    expect(inputElement).toHaveValue(inputString);
  });

  it("should prevent user from entering more than 20 characters", async () => {
    render(<NewColumn />);
    const inputElement = screen.getByRole("textbox");

    const inputString = Array.from(Array(30).keys()).join("").substring(0, 21);
    await userEvent.type(inputElement, inputString);

    expect(inputElement).not.toHaveValue(inputString);
    expect(inputElement).toHaveValue(inputString.substring(0, 20));
  });

  // TODO
  it.skip("should call create new column request on enter", async () => {
    render(<NewColumn />);
    const inputElement = screen.getByRole("textbox");

    const inputVlaue = "new column vlaue";
    await userEvent.type(inputElement, inputVlaue);

    // expect(inputElement).toHaveValue(inputVlaue);
  });

  // TODO
  it.skip("should not call create new column request on enter when empty value is in the input", async () => {
    render(<NewColumn />);
    const inputElement = screen.getByRole("textbox");

    await userEvent.click(inputElement);

    // expect(inputElement).toHaveValue(inputVlaue);
  });

  // TODO
  it.skip("should not call create new column request on enter when spaces are in the input", async () => {
    render(<NewColumn />);
    const inputElement = screen.getByRole("textbox");

    const inputVlaue = " ";
    await userEvent.type(inputElement, inputVlaue);

    // expect(inputElement).toHaveValue(inputVlaue);
  });

  it("should clear value on enter", async () => {
    render(<NewColumn />);
    const inputElement = screen.getByRole("textbox");

    const inputVlaue = "new column vlaue";
    await userEvent.type(inputElement, inputVlaue);

    expect(inputElement).toHaveValue(inputVlaue);

    await userEvent.keyboard("{Enter}");
    expect(inputElement).toHaveValue("");
  });
});
