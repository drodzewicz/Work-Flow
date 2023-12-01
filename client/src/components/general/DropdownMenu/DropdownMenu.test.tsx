import DropdownMenu from "./DropdownMenu";
import DropdownMenuItem from "./DropdownMenuItem";
import { render, screen } from "@testing-library/react";

it("shoud", () => {
  const someRef = { current: null };
  const { container } = render(
    <DropdownMenu anchorRef={someRef}>
      <DropdownMenuItem>one</DropdownMenuItem>
    </DropdownMenu>,
  );
  screen.debug(container);
});
