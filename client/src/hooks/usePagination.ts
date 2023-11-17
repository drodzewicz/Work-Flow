import { useDebugValue, useState } from "react";

interface IusePagination {
  initialPage: number;
  limit: number;
}

const usePagination = ({ initialPage, limit }: IusePagination) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);

  useDebugValue(currentPage, (page) => page);
  useDebugValue(totalPages, (total) => total);

  const setTotalItems = (count: number) => {
    setTotalPages(Math.ceil(count / limit));
  };

  return { currentPage, totalPages, limit, setCurrentPage, setTotalItems };
};

export { usePagination };
