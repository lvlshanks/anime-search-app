import { Anime } from '../types/anime';

export enum APIActionKind {
    FETCH_START = 'FETCH_START',
    FETCH_SUCCESS = 'FETCH_SUCCESS',
    FETCH_COMPLETE = 'FETCH_COMPLETE',
}

interface APIState {
    isAPILoading?: boolean;
    lastVisiblePage?: number;
    animeList?: Anime[];
    anime?: Anime;
}

interface APIAction {
    type: APIActionKind;
    payload?: APIState;
}

const animeListFetchReducer = (state: APIState, action: APIAction): APIState => {
  const { type } = action;
  switch (type) {
    case APIActionKind.FETCH_START:
      return {
        ...state,
        isAPILoading: true,
        animeList: [],
      };
    case APIActionKind.FETCH_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case APIActionKind.FETCH_COMPLETE:
      return {
        ...state,
        isAPILoading: false,
      };
    default:
      return state;
  }
};

export default animeListFetchReducer;
