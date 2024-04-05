import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewColumn from "./NewColumn";
import { server } from "@/test/mocks/server";
import { renderWithWrappers, ReactQueryWrapper, createRouteWrapper } from "@/test/utils";
import * as ColumnServiceHooks from "@/service/column";

describe("Test Component - NewColumn", () => {
  const RouteWrapper = createRouteWrapper("/board/:id", "/board/someId123");

  // eslint-disable-next-line testing-library/render-result-naming-convention
  const render = renderWithWrappers([RouteWrapper, ReactQueryWrapper]);

  const useCreateColumnSpy = vi.spyOn(ColumnServiceHooks, "useCreateColumn");

  const createNewColumnMockFn = vi.fn();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  useCreateColumnSpy.mockReturnValue({
    mutate: createNewColumnMockFn,
  });

  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    createNewColumnMockFn.mockReset();
  });

  afterEach(() => {
    server.resetHandlers();
    useCreateColumnSpy.mockClear();
  });

  afterAll(() => {
    server.close();
  });

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

  it("should call create new column request on enter", async () => {
    render(<NewColumn />);
    const inputElement = screen.getByRole("textbox");

    const inputVlaue = "new column vlaue";
    await userEvent.type(inputElement, inputVlaue);

    await userEvent.keyboard("{Enter}");

    expect(createNewColumnMockFn).toHaveBeenCalledWith(inputVlaue);
  });

  it("should not call create new column request on enter when empty value is in the input", async () => {
    render(<NewColumn />);
    const inputElement = screen.getByRole("textbox");

    await userEvent.click(inputElement);

    expect(createNewColumnMockFn).not.toHaveBeenCalled();
  });

  it("should not call create new column request on enter when spaces are in the input", async () => {
    render(<NewColumn />);
    const inputElement = screen.getByRole("textbox");

    const inputVlaue = " ";
    await userEvent.type(inputElement, inputVlaue);

    expect(createNewColumnMockFn).not.toHaveBeenCalled();
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
