import { useMemo } from "react";

type PaginationPageCountProps = {
    totalItems?: number;
    limit: number;
};

const usePaginationPageCount = ({ totalItems = 0, limit }: PaginationPageCountProps) => {
    return useMemo(() => Math.ceil(totalItems / limit), [totalItems, limit]);
};

export default usePaginationPageCount;
