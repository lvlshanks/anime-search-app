import axios, { CancelTokenSource } from 'axios';
import { useReducer } from 'react';
import toast from 'react-hot-toast';
import { animeFetchReducer, APIActionKind } from '../reducers';

interface UseAPIArgs {
  baseURL: string;
  searchParams?: URLSearchParams;
  animeID?: string;
}

const useAPI = ({ baseURL, searchParams, animeID }: UseAPIArgs) => {
  const [state, dispatch] = useReducer(animeFetchReducer, {
    isAPILoading: true,
    lastVisiblePage: 0,
    animeList: [],
    anime: undefined,
  });

  const notifyError = () =>
    toast.error('Something went wrong! Please try again later.', {
      style: {
        minWidth: 'fit-content',
      },
    });

  const getAnimeList = async () => {
    dispatch({
      type: APIActionKind.FETCH_START,
      payload: {
        animeList: [],
      },
    });
    try {
      const { data } = await axios.get(`${baseURL}?${searchParams}`);
      dispatch({
        type: APIActionKind.FETCH_SUCCESS,
        payload: {
          animeList: data.data,
          lastVisiblePage: data.pagination.last_visible_page,
        },
      });
    } catch {
      notifyError();
    }
    dispatch({ type: APIActionKind.FETCH_COMPLETE });
  };

  const getAnime = async (cancelTokenSource: CancelTokenSource) => {
    dispatch({ type: APIActionKind.FETCH_START });
    try {
      const { data } = await axios.get(`${baseURL}/${animeID}`, {
        cancelToken: cancelTokenSource.token,
      });
      dispatch({
        type: APIActionKind.FETCH_SUCCESS,
        payload: {
          anime: data.data,
        },
      });
      dispatch({ type: APIActionKind.FETCH_COMPLETE });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message !== 'Cancelled due to stale request'
      ) {
        notifyError();
        dispatch({ type: APIActionKind.FETCH_COMPLETE });
      }
    }
  };

  return {
    animeList: state.animeList,
    anime: state.anime,
    isAPILoading: state.isAPILoading,
    lastVisiblePage: state.lastVisiblePage,
    getAnimeList,
    getAnime,
  };
};

export default useAPI;
