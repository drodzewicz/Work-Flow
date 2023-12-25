import { useDebugValue, useState } from "react";

type PaginationProps = {
  initialPage: number;
  limit: number;
};

const usePagination = ({ initialPage, limit }: PaginationProps) => {
  const FIRST_PAGE_INDEX = 1;

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(FIRST_PAGE_INDEX);

  useDebugValue(currentPage, (page) => page);
  useDebugValue(totalPages, (total) => total);

  const setTotalItems = (count: number) => {
    setTotalPages(Math.ceil(count / limit));
  };

  const reset = () => {
    if (currentPage !== FIRST_PAGE_INDEX) {
      setCurrentPage(FIRST_PAGE_INDEX);
    }
  };

  return { currentPage, totalPages, limit, setCurrentPage, setTotalItems, reset };
};

export default usePagination;
