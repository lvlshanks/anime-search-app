import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <div>
        <Typography variant="h1" fontWeight="bold">
          404
        </Typography>
      </div>
      <div>
        <Typography variant="h5" fontWeight="bold">
          PAGE NOT FOUND
        </Typography>
      </div>
      <Box pb={3} />
      <Button onClick={() => navigate('/')}>
        <Typography variant="h6" fontWeight="bold">
          Take me home
        </Typography>
      </Button>
    </Box>
  );
};

export default NotFound;
