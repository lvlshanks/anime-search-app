import {
  Card, CardActionArea, CardMedia, CardContent, Typography, Skeleton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AnimeCardProps } from './AnimeCard.types';

const AnimeCard = ({
  id,
  imageURL,
  isLoading,
  title = 'N/A',
}: AnimeCardProps) => {
  const navigate = useNavigate();
  return (
    isLoading ? <Skeleton variant="rectangular" width={225} height={350} /> : (
      <Card sx={{ width: 225, height: 350 }}>
        <CardActionArea
          sx={{ height: 'inherit' }}
          onClick={() => navigate(`/animes/detail/${id}`)}
        >
          <CardMedia
            component="img"
            height="275"
            image={imageURL}
            alt={title}
          />
          <CardContent>
            <Typography gutterBottom variant="body1" component="div" noWrap>
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  );
};

export default AnimeCard;
