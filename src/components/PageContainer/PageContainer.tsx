import { AppBar, Box, Typography } from '@mui/material';
import { PageContainerProps } from './PageContainer.types';

const PageContainer = ({ children }: PageContainerProps) => (
  <div>
    <AppBar position="sticky" sx={{ p: 2 }}>
      <Typography variant="h5">Anime Search App</Typography>
    </AppBar>
    <Box
      py={3}
      px={2}
    >
      {children}
    </Box>
  </div>
);

export default PageContainer;
