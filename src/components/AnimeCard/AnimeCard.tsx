import {
  Card, CardActionArea, CardMedia, CardContent, Typography, Skeleton,
} from '@mui/material';
import { AnimeCardProps } from './AnimeCard.types';

const AnimeCard = ({
  title = 'N/A',
  imageURL,
  isLoading,
}: AnimeCardProps) => (
  isLoading ? <Skeleton variant="rectangular" width={225} height={350} /> : (
    <Card sx={{ width: 225, height: 350 }}>
      <CardActionArea sx={{ height: 'inherit' }}>
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

export default AnimeCard;
