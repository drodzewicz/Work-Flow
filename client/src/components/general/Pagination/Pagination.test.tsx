import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Test Component - Pagination", () => {
  const mockHandlePageChange = vi.fn();

  it("should render component if there is more than one page of pagination", () => {
    render(<Pagination current={0} total={2} handleChange={mockHandlePageChange} />);

    expect(screen.queryByRole("navigation")).toBeInTheDocument();
  });

  it("should not render component unless there is more than one page of pagination", () => {
    render(<Pagination current={0} total={1} handleChange={mockHandlePageChange} />);

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("should only display right navigation arrow if current page is first page", () => {
    render(<Pagination current={1} total={10} handleChange={mockHandlePageChange} />);

    const nextNavigationElement = screen.queryByRole("button", { name: "next-page-navigation" });
    const previousNavigationElement = screen.queryByRole("button", {
      name: "previous-page-navigation",
    });

    expect(nextNavigationElement).toBeInTheDocument();
    expect(previousNavigationElement).not.toBeInTheDocument();
  });

  it("should only display left navigation arrow if current page is last page", () => {
    render(<Pagination current={10} total={10} handleChange={mockHandlePageChange} />);

    const nextNavigationElement = screen.queryByRole("button", { name: "next-page-navigation" });
    const previousNavigationElement = screen.queryByRole("button", {
      name: "previous-page-navigation",
    });

    expect(nextNavigationElement).not.toBeInTheDocument();
    expect(previousNavigationElement).toBeInTheDocument();
  });

  it("should display both navigation arrows when current page is neither first or last", () => {
    render(<Pagination current={2} total={10} handleChange={mockHandlePageChange} />);

    const nextNavigationElement = screen.queryByRole("button", { name: "next-page-navigation" });
    const previousNavigationElement = screen.queryByRole("button", {
      name: "previous-page-navigation",
    });

    expect(nextNavigationElement).toBeInTheDocument();
    expect(previousNavigationElement).toBeInTheDocument();
  });

  it("should display previous and next page index", () => {
    const currentPageNumber = 3;
    render(
      <Pagination current={currentPageNumber} total={10} handleChange={mockHandlePageChange} />,
    );

    const currentPage = screen.getByRole("button", { name: "current-page" });
    const previousPage = screen.getByRole("button", { name: "previous-page" });
    const nextPage = screen.getByRole("button", { name: "next-page" });

    expect(currentPage).toHaveTextContent(`${currentPageNumber}`);
    expect(previousPage).toHaveTextContent(`${currentPageNumber - 1}`);
    expect(nextPage).toHaveTextContent(`${currentPageNumber + 1}`);
  });

  it("should handle next page transition logic when clicking on right arrow navigation", () => {
    const currentPageNumber = 3;

    render(
      <Pagination current={currentPageNumber} total={10} handleChange={mockHandlePageChange} />,
    );

    const nextNavigationElement = screen.getByRole("button", { name: "next-page-navigation" });
    fireEvent.click(nextNavigationElement);

    expect(mockHandlePageChange).toHaveBeenCalledWith(currentPageNumber + 1);
  });

  it("should handle previous page transition logic when clicking on left arrow navigation", () => {
    const currentPageNumber = 3;

    render(
      <Pagination current={currentPageNumber} total={10} handleChange={mockHandlePageChange} />,
    );

    const previousNavigationElement = screen.getByRole("button", {
      name: "previous-page-navigation",
    });
    fireEvent.click(previousNavigationElement);

    expect(mockHandlePageChange).toHaveBeenCalledWith(currentPageNumber - 1);
  });
});
