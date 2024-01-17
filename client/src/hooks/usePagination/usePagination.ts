import { useDebugValue, useState, useMemo } from "react";

type PaginationProps = {
  initialPage?: number;
  limit: number;
};

const FIRST_PAGE_INDEX = 1;

const usePagination = ({ initialPage = FIRST_PAGE_INDEX, limit }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalItems, setTotalItems] = useState<number>(1);

  const totalPages = useMemo(() => Math.ceil(totalItems / limit), [totalItems, limit]);

  useDebugValue(currentPage, (page) => page);
  useDebugValue(totalPages, (totalPages) => totalPages);
  useDebugValue(totalItems, (totalItems) => totalItems);

  const reset = () => {
    if (currentPage !== FIRST_PAGE_INDEX) {
      setCurrentPage(FIRST_PAGE_INDEX);
    }
  };

  return { currentPage, totalPages, totalItems, limit, setCurrentPage, setTotalItems, reset };
};

export default usePagination;
