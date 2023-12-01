import { fireEvent, render, screen } from "@testing-library/react";
import ExpandText from "./ExpandText";

const title = "Test Title";
const descritpion = "Test descritpion";

it("should only display component title", () => {
  render(<ExpandText title={title}>{descritpion}</ExpandText>);

  const titleElement = screen.getByRole("heading", { name: title });
  const descriptionElement = screen.getByText(descritpion);

  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toHaveClass("expand-text__content--hidden");
});

it("should display component title and description", () => {
  render(
    <ExpandText isOpen title={title}>
      {descritpion}
    </ExpandText>,
  );

  const titleElement = screen.getByRole("heading", { name: title });
  const descriptionElement = screen.getByText(descritpion);

  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).not.toHaveClass("expand-text__content--hidden");
});

it("should toggle description after expand button click", () => {
  render(<ExpandText title={title}>{descritpion}</ExpandText>);

  const expandButton = screen.getByRole("button");
  const descriptionElement = screen.getByText(descritpion);

  expect(descriptionElement).toHaveClass("expand-text__content--hidden");
  fireEvent.click(expandButton);
  expect(descriptionElement).not.toHaveClass("expand-text__content--hidden");
  fireEvent.click(expandButton);
  expect(descriptionElement).toHaveClass("expand-text__content--hidden");
});
