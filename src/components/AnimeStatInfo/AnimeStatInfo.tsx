import { Box, Paper, Skeleton, Typography } from '@mui/material';
import { AnimeStatInfoProps } from './AnimeStatInfo.types';

const AnimeStatInfo = ({
  anime,
  isLoading = false,
  statType,
}: AnimeStatInfoProps) => {
  const renderStat = () => {
    switch (statType) {
      case 'score': {
        return {
          stat: anime?.score ? `${anime.score.toFixed(2)}` : 'N/A',
          statHeading: anime?.scored_by
            ? `${anime.scored_by.toLocaleString()} USERS`
            : 'NO. OF RATINGS',
          colors: {
            backgroundColor: '#D6EAF8',
            borderColor: '#85C1E9',
            '& h6': {
              color: '#1F618D',
            },
            '& span': {
              color: '#3498DB',
            },
          },
        };
      }
      case 'rank': {
        return {
          stat: anime?.rank ? `#${anime.rank.toLocaleString()}` : 'N/A',
          statHeading: anime?.rank ? 'RANKED' : 'UNRANKED',
          colors: {
            backgroundColor: '#E8DAEF',
            borderColor: '#BB8FCE',
            '& h6': {
              color: '#6C3483',
            },
            '& span': {
              color: '#8E44AD',
            },
          },
        };
      }
      case 'popularity': {
        return {
          stat: anime?.popularity
            ? `#${anime.popularity.toLocaleString()}`
            : 'N/A',
          statHeading: 'POPULARITY',
          colors: {
            backgroundColor: '#FADBD8',
            borderColor: '#F1948A',
            '& h6': {
              color: '#B03A2E',
            },
            '& span': {
              color: '#E74C3C',
            },
          },
        };
      }
      case 'members': {
        return {
          stat: anime?.members ? `${anime.members.toLocaleString()}` : 'N/A',
          statHeading: 'MEMBERS',
          colors: {
            backgroundColor: '#D5F5E3',
            borderColor: '#82E0AA',
            '& h6': {
              color: '#1E8449',
            },
            '& span': {
              color: '#27AE60',
            },
          },
        };
      }
      default:
        return {
          stat: 'N/A',
          statHeading: 'N/A',
          colors: {
            backgroundColor: '#D6EAF8',
            borderColor: '#85C1E9',
          },
          '& h6': {
            color: '#1F618D',
          },
          '& span': {
            color: '#3498DB',
          },
        };
    }
  };

  return isLoading ? (
    <Skeleton variant="rectangular" width={150} height={50} />
  ) : (
    <Paper variant="outlined" sx={{ width: 150, ...renderStat().colors }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight="bold">
          {renderStat().stat}
        </Typography>
        <Typography variant="caption" fontWeight="bold">
          {renderStat().statHeading}
        </Typography>
      </Box>
    </Paper>
  );
};

export default AnimeStatInfo;
