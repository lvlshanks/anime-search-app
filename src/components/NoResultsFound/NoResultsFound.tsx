import { SearchOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

const NoResultsFound = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
  >
    <SearchOutlined sx={{ width: 50, height: 50 }} />
    <Typography variant="h5">No Results Found!</Typography>
  </Box>
);

export default NoResultsFound;
