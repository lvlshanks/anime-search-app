import {
  AppBar, Box, Button, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PageContainerProps } from './PageContainer.types';

const PageContainer = ({ children }: PageContainerProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <AppBar position="sticky" sx={{ p: 2, alignItems: 'flex-start' }}>
        <Button onClick={() => navigate('/')} variant="outlined">
          <Typography variant="h5" color="white">Anime Search App</Typography>
        </Button>
      </AppBar>
      <Box
        py={3}
        px={2}
      >
        {children}
      </Box>
    </div>
  );
};

export default PageContainer;
