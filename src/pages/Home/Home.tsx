import { Box, Pagination } from '@mui/material';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import {
  AnimeList, SearchBar,
} from '../../components';
import { ANIME_API_URL, ITEMS_PER_PAGE } from '../../constants';
import { useDebouncedQuery, usePagination, useAPI } from '../../hooks';
import { formatQueryString } from '../../utils';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    limit: ITEMS_PER_PAGE.toString(),
    order_by: 'title',
    sort: 'asc',
  });
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const debouncedQuery = useDebouncedQuery({ query, waitTime: 250 });
  const {
    page, handlePageChange,
  } = usePagination();
  const {
    animeList, isAPILoading, lastVisiblePage, getAnimeList,
  } = useAPI({ baseURL: ANIME_API_URL, searchParams });

  useEffect(() => {
    getAnimeList();
    const pageQuery = parseInt(searchParams.get('page') || '1', 10);
    if (pageQuery !== page) {
      handlePageChange(pageQuery);
    }
    const searchQuery = searchParams.get('q') || '';
    if (searchQuery !== debouncedQuery) {
      setQuery(searchQuery);
    }
    window.scrollTo(0, 0);
  }, [searchParams]);

  useEffect(() => {
    const queryParams = { ...qs.parse(searchParams.toString()), q: debouncedQuery };
    if (debouncedQuery !== (searchParams.get('q') || '')) {
      setSearchParams({
        ...formatQueryString(queryParams),
        page: '1',
      });
    } else {
      setSearchParams({
        ...formatQueryString(queryParams),
      });
    }
  }, [debouncedQuery]);

  return (
    <div>
      <Box display="flex" justifyContent="center" pb={4}>
        <SearchBar query={query} handleOnChange={setQuery} />
      </Box>
      <AnimeList animeList={animeList} isLoading={isAPILoading} />
      {lastVisiblePage > 1 && (
        <Box display="flex" justifyContent="center" py={4}>
          <Pagination
            count={lastVisiblePage}
            page={page}
            onChange={(event: React.ChangeEvent<unknown>, value: number) => {
              handlePageChange(value);
              const queryParams = qs.parse(searchParams.toString());
              setSearchParams({
                ...queryParams,
                page: value.toString(),
              });
            }}
            showFirstButton
            showLastButton
          />
        </Box>
      )}
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Home;
