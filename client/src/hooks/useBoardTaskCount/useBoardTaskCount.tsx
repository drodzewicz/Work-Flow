import useBoardId from "@/hooks/useBoardId";
import { useEffect, useMemo } from "react";

type ColumnWithTasks = {
    tasks: unknown[];
};

const useBoardTaskCount = (data: ColumnWithTasks[]) => {
    const LOCAL_STORAGE_KEY = "cachedColumnTaskCount";
    const MAX_CACHED_BOARD_COUNT = 10;

    const boardId = useBoardId();

    const cachedColumnTaskCount: Record<string, number[]> = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"
    );

    const columnTaskCount = useMemo(() => {
        return data.map((it) => it.tasks?.length);
    }, [data]);

    useEffect(() => {
        return () => {
            const boardIds = Object.keys(cachedColumnTaskCount);
            if (boardIds.length >= MAX_CACHED_BOARD_COUNT) {
                delete cachedColumnTaskCount[boardIds[0]];
            }
            cachedColumnTaskCount[boardId] = columnTaskCount;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cachedColumnTaskCount));
        };
    }, [columnTaskCount, boardId]);

    return cachedColumnTaskCount[boardId] || [];
};

export default useBoardTaskCount;
