import { act, renderHook } from "@testing-library/react";
import usePagination from "./usePagination";

describe("Test Hook - Pagination", () => {
  it("should set first page to 1 if initialPage prop is not provided", async () => {
    const { result } = renderHook(usePagination, { initialProps: { limit: 5 } });

    expect(result.current.currentPage).toEqual(1);
  });

  it("should set first page to provided value", async () => {
    const initialPage = 5;
    const { result } = renderHook(usePagination, { initialProps: { limit: 5, initialPage } });

    expect(result.current.currentPage).toEqual(initialPage);
  });

  it("should set current page to provided value", async () => {
    const nextPage = 3;

    const { result } = renderHook(usePagination, { initialProps: { limit: 5 } });

    act(() => {
      result.current.setCurrentPage(nextPage);
    });

    expect(result.current.currentPage).toEqual(nextPage);
  });

  it("should reset to first page on reset function call", async () => {
    const nextPage = 3;

    const { result } = renderHook(usePagination, { initialProps: { limit: 5 } });

    act(() => {
      result.current.setCurrentPage(nextPage);
    });
    expect(result.current.currentPage).toEqual(nextPage);

    act(() => {
      result.current.reset();
    });

    expect(result.current.currentPage).toEqual(1);
  });

  it("should set totalItems to provided value", async () => {
    const totalItems = 3;

    const { result } = renderHook(usePagination, { initialProps: { limit: 5 } });

    act(() => {
      result.current.setTotalItems(totalItems);
    });

    expect(result.current.totalItems).toEqual(totalItems);
  });

  it("should calculate total page value when provided with totalItems", async () => {
    const { result } = renderHook(usePagination, { initialProps: { limit: 5 } });

    act(() => {
      result.current.setTotalItems(2);
    });

    expect(result.current.totalPages).toEqual(1);

    act(() => {
      result.current.setTotalItems(10);
    });

    expect(result.current.totalPages).toEqual(2);

    act(() => {
      result.current.setTotalItems(11);
    });

    expect(result.current.totalPages).toEqual(3);
  });
});
