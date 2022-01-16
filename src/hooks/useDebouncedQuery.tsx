import { useEffect, useState } from 'react';

interface UseDebouncedQueryArgs {
    query: string;
    waitTime: number;
}

const useDebouncedQuery = ({
  query,
  waitTime,
}: UseDebouncedQueryArgs) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), waitTime);
    return () => clearTimeout(id);
  }, [query]);

  return debouncedQuery;
};

export default useDebouncedQuery;
