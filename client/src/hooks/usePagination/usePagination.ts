import { useDebugValue, useState } from "react";

type PaginationProps = {
    initialPage?: number;
    limit: number;
};

const FIRST_PAGE_INDEX = 1;

const usePagination = ({ initialPage = FIRST_PAGE_INDEX, limit }: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState<number>(initialPage);

    useDebugValue(currentPage, (page) => page);

    const reset = () => {
        if (currentPage !== FIRST_PAGE_INDEX) {
            setCurrentPage(FIRST_PAGE_INDEX);
        }
    };

    return { currentPage, limit, setCurrentPage, reset };
};

export default usePagination;
