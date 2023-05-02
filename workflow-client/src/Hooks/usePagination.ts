import { useState } from "react";

interface IusePagination {
  initialPage: number;
  limit: number;
  initialTotal?: number;
}

const usePagination = <T>({
  initialPage,
  limit,
  initialTotal = 1,
}: IusePagination) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(initialTotal);

  return { currentPage, totalPages, limit, setCurrentPage, setTotalPages};
};

export { usePagination };
