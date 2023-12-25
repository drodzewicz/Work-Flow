import { act, renderHook } from "@testing-library/react";
import useBoolean from "./useBoolean";

describe("Test Hook - Boolean", () => {
  it("should return state true when initial state is set to true", async () => {
    const { result } = renderHook(useBoolean, { initialProps: true });

    expect(result.current.state).toBe(true);
  });

  it("should return state false when initial state is set to false", async () => {
    const { result } = renderHook(useBoolean, { initialProps: false });

    expect(result.current.state).toBe(false);
  });

  it("should set state to true when setTrue function is called", async () => {
    const { result } = renderHook(useBoolean, { initialProps: false });

    await act(() => {
      result.current.setTrue();
    });
    expect(result.current.state).toBe(true);
  });

  it("should set state to false when setFalse function is called", async () => {
    const { result } = renderHook(useBoolean, { initialProps: true });

    await act(() => {
      result.current.setFalse();
    });
    expect(result.current.state).toBe(false);
  });

  it("should return different state when toggleState function is called", async () => {
    const { result } = renderHook(useBoolean, { initialProps: true });

    await act(() => {
      result.current.toggleState();
    });
    expect(result.current.state).toBe(false);

    await act(() => {
      result.current.toggleState();
    });
    expect(result.current.state).toBe(true);

    await act(() => {
      result.current.toggleState();
    });
    expect(result.current.state).toBe(false);
  });
});
