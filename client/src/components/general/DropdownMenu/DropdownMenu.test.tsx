import React from "react";
import DropdownMenu from "./DropdownMenu";
import DropdownMenuItem from "./DropdownMenuItem";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Test Component - DropdownMenu", () => {
  it("shoud not render dropdown on initial load", () => {
    const ref = React.createRef<HTMLButtonElement>();

    render(
      <>
        <button ref={ref}>click</button>
        <DropdownMenu anchorRef={ref}>
          <DropdownMenuItem>one</DropdownMenuItem>
          <DropdownMenuItem>two</DropdownMenuItem>
          <DropdownMenuItem>three</DropdownMenuItem>
        </DropdownMenu>
      </>,
    );

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("shoud render dropdown when clicked on the anchor element", async () => {
    const ref = React.createRef<HTMLButtonElement>();

    render(
      <>
        <button ref={ref}>click</button>
        <DropdownMenu anchorRef={ref}>
          <DropdownMenuItem>one</DropdownMenuItem>
          <DropdownMenuItem>two</DropdownMenuItem>
          <DropdownMenuItem>three</DropdownMenuItem>
        </DropdownMenu>
      </>,
    );

    await userEvent.click(screen.getByRole("button", { name: "click" }));

    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("shoud hide the dropdown when clicked on the anchor element a second time", async () => {
    const ref = React.createRef<HTMLButtonElement>();

    render(
      <>
        <button ref={ref}>click</button>
        <DropdownMenu anchorRef={ref}>
          <DropdownMenuItem>one</DropdownMenuItem>
          <DropdownMenuItem>two</DropdownMenuItem>
          <DropdownMenuItem>three</DropdownMenuItem>
        </DropdownMenu>
      </>,
    );

    await userEvent.click(screen.getByRole("button", { name: "click" }));

    expect(screen.getByRole("list")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "click" }));

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("shoud hide the dropdown when clicked on dropdown item", async () => {
    const ref = React.createRef<HTMLButtonElement>();

    render(
      <>
        <button ref={ref}>click</button>
        <DropdownMenu anchorRef={ref} onClickClose={true}>
          <DropdownMenuItem>one</DropdownMenuItem>
          <DropdownMenuItem>two</DropdownMenuItem>
          <DropdownMenuItem>three</DropdownMenuItem>
        </DropdownMenu>
      </>,
    );

    await userEvent.click(screen.getByRole("button", { name: "click" }));

    expect(screen.getByRole("list")).toBeInTheDocument();

    await userEvent.click(screen.getByText("two"));

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("shoud not hide the dropdown when clicked on dropdown item", async () => {
    const ref = React.createRef<HTMLButtonElement>();

    render(
      <>
        <button ref={ref}>click</button>
        <DropdownMenu anchorRef={ref} onClickClose={false}>
          <DropdownMenuItem>one</DropdownMenuItem>
          <DropdownMenuItem>two</DropdownMenuItem>
          <DropdownMenuItem>three</DropdownMenuItem>
        </DropdownMenu>
      </>,
    );

    await userEvent.click(screen.getByRole("button", { name: "click" }));

    expect(screen.getByRole("list")).toBeInTheDocument();

    await userEvent.click(screen.getByText("two"));

    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("shoud hide the dropdown when clicked outside of the component", async () => {
    const ref = React.createRef<HTMLButtonElement>();

    render(
      <div data-testid="test-wrapper">
        <button ref={ref}>click</button>
        <DropdownMenu anchorRef={ref}>
          <DropdownMenuItem>one</DropdownMenuItem>
          <DropdownMenuItem>two</DropdownMenuItem>
          <DropdownMenuItem>three</DropdownMenuItem>
        </DropdownMenu>
      </div>,
    );

    await userEvent.click(screen.getByRole("button", { name: "click" }));

    expect(screen.getByRole("list")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("test-wrapper"));

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
