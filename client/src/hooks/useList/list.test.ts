import { act, renderHook } from "@testing-library/react";
import useList from "./useList";

describe("Test Hook - List", () => {
    const testList = [
        { a: "letter a index 1", b: "letter b index 1" },
        { a: "letter a index 2", b: "letter b index 2" },
        { a: "letter a index 3", b: "letter b index 3" },
        { a: "letter a index 4", b: "letter b index 4" },
    ];

    it("should return data which was initially set", async () => {
        const { result } = renderHook(useList, { initialProps: testList });

        expect(result.current.data).toBe(testList);
    });

    it("should set empty list as default value", async () => {
        const { result } = renderHook(useList, { initialProps: undefined });

        expect(result.current.data).toEqual([]);
    });

    it("should add new item when addItems is called", async () => {
        const newItem = { a: "new item a", b: "new item b" };

        const { result } = renderHook(useList, { initialProps: testList });

        expect(result.current.data).not.toContain(newItem);
        expect(result.current.data).toHaveLength(testList.length);

        act(() => {
            result.current.addItem(newItem);
        });

        expect(result.current.data).toHaveLength(testList.length + 1);
        expect(result.current.data).toContain(newItem);
    });

    it("should set data to empty list when clear is called", async () => {
        const { result } = renderHook(useList, { initialProps: testList });

        expect(result.current.data).toBe(testList);

        act(() => {
            result.current.clear();
        });

        expect(result.current.data).toHaveLength(0);
    });

    it("should remove item from list when removeItem is called", async () => {
        const itemToRemove = testList[2];
        const { result } = renderHook(useList, { initialProps: testList });

        expect(result.current.data).toContain(itemToRemove);

        act(() => {
            result.current.removeItem(itemToRemove, "a");
        });

        expect(result.current.data).toHaveLength(testList.length - 1);
        expect(result.current.data).not.toContain(itemToRemove);
    });

    it("should filter items based on provided condition", async () => {
        const { result } = renderHook(useList, { initialProps: testList });

        expect(result.current.data).toBe(testList);

        act(() => {
            result.current.filterItem((it) => !it.a.includes("2"));
        });

        expect(result.current.data).toHaveLength(testList.length - 1);
    });
});
