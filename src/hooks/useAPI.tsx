import axios from 'axios';
import { useReducer } from 'react';
import toast from 'react-hot-toast';
import { animeListFetchReducer, APIActionKind } from '../reducers';

interface UseAPIArgs {
    baseURL: string;
    searchParams?: URLSearchParams;
}

const useAPI = ({ baseURL, searchParams }: UseAPIArgs) => {
  const [state, dispatch] = useReducer(animeListFetchReducer, {
    isAPILoading: true,
    lastVisiblePage: 0,
    animeList: [],
  });

  const notifyError = () => toast.error('Something went wrong! Please try again later.', {
    style: {
      minWidth: 'fit-content',
    },
  });

  const getAnimeList = async () => {
    dispatch({ type: APIActionKind.FETCH_START });
    try {
      const { data } = await axios.get(`${baseURL}?${searchParams}`);
      dispatch({
        type: APIActionKind.FETCH_SUCCESS,
        payload: {
          animeList: data.data,
          lastVisiblePage: data.pagination.last_visible_page,
        },
      });
    } catch (error) {
      notifyError();
    }
    dispatch({ type: APIActionKind.FETCH_COMPLETE });
  };

  return {
    animeList: state.animeList,
    isAPILoading: state.isAPILoading,
    lastVisiblePage: state.lastVisiblePage,
    getAnimeList,
  };
};

export default useAPI;
