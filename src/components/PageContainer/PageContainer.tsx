import {
  AppBar, Box, Button, IconButton, Typography, useTheme,
} from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brightness7, Brightness4 } from '@mui/icons-material';
import { PageContainerProps } from './PageContainer.types';
import { ColorModeContext } from '../ColorMode';

const PageContainer = ({ children }: PageContainerProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <div>
      <AppBar
        position="sticky"
        sx={{
          flexDirection: 'row', p: 2, alignItems: 'flex-start', justifyContent: 'space-between',
        }}
      >
        <Button onClick={() => navigate('/')} sx={{ '&:hover': { backgroundColor: 'transparent' } }} disableRipple>
          <Typography variant="h5" color="white">Anime Search App</Typography>
        </Button>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
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
