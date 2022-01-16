import { useState } from 'react';

const usePagination = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  return {
    page,
    handlePageChange,
  };
};

export default usePagination;
