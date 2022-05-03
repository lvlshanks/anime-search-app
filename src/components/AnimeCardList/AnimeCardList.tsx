import { Grid } from '@mui/material';
import uniqueID from 'lodash.uniqueid';
import { AnimeCard, NoResultsFound } from '..';
import { ITEMS_PER_PAGE } from '../../constants';
import { AnimeListProps } from './AnimeCardList.types';

const AnimeCardList = ({ animeList, isLoading = false }: AnimeListProps) => {
  const renderAnimeCards = () => (
    <Grid container spacing={3} justifyContent="center">
      {animeList.map((anime) => (
        <Grid item key={uniqueID()}>
          <AnimeCard
            title={anime.title}
            imageURL={anime?.images?.jpg?.image_url}
            isLoading={isLoading}
            id={anime.mal_id}
          />
        </Grid>
      ))}
    </Grid>
  );

  const renderLoadingState = () => (
    <Grid container spacing={3} justifyContent="center">
      {[...new Array(ITEMS_PER_PAGE)].map(() => (
        <Grid item key={uniqueID()}>
          <AnimeCard isLoading={isLoading} />
        </Grid>
      ))}
    </Grid>
  );

  const renderAnimeList = () => {
    if (animeList.length > 0) return renderAnimeCards();
    if (isLoading) return renderLoadingState();
    return <NoResultsFound />;
  };

  return renderAnimeList();
};

export default AnimeCardList;
