import { ArrowBackIosNew } from '@mui/icons-material';
import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimeStatInfo } from '../../components';
import { ANIME_API_URL } from '../../constants';
import { useAPI } from '../../hooks';

const AnimeDetail = () => {
  const { animeID } = useParams();
  const navigate = useNavigate();
  const { anime, getAnime, isAPILoading } = useAPI({
    baseURL: ANIME_API_URL,
    animeID,
  });

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    getAnime(cancelTokenSource);
    return () => {
      cancelTokenSource.cancel('Cancelled due to stale request');
    };
  }, [animeID]);

  const renderAnimeImage = () =>
    isAPILoading ? (
      <Skeleton variant="rectangular" width={250} height={350} />
    ) : (
      <img
        src={anime?.images?.jpg?.image_url}
        alt={anime?.title}
        width={250}
        height={350}
      />
    );

  const renderAnimeInfo = () =>
    isAPILoading ? (
      <>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="rectangular" height={200} />
      </>
    ) : (
      <>
        <Typography variant="h5" fontWeight="bold" sx={{ paddingBottom: 3 }}>
          {anime?.title || 'N/A'}
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          Synopsis
        </Typography>
        <Typography variant="body1">{anime?.synopsis || 'N/A'}</Typography>
      </>
    );

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<ArrowBackIosNew />}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Box pb={3} />
      <Box
        display="flex"
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'center', sm: 'initial' },
        }}
      >
        {renderAnimeImage()}
        <Box pb={3} />
        <Box
          display="flex"
          flexDirection="column"
          px={3}
          justifyContent="space-between"
        >
          <div>{renderAnimeInfo()}</div>
          <Box pb={3} />
          <div>
            <Grid container spacing={2}>
              <Grid item>
                <AnimeStatInfo
                  anime={anime}
                  statType="score"
                  isLoading={isAPILoading}
                />
              </Grid>
              <Grid item>
                <AnimeStatInfo
                  anime={anime}
                  statType="rank"
                  isLoading={isAPILoading}
                />
              </Grid>
              <Grid item>
                <AnimeStatInfo
                  anime={anime}
                  statType="popularity"
                  isLoading={isAPILoading}
                />
              </Grid>
              <Grid item>
                <AnimeStatInfo
                  anime={anime}
                  statType="members"
                  isLoading={isAPILoading}
                />
              </Grid>
            </Grid>
          </div>
        </Box>
      </Box>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default AnimeDetail;
