import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { SearchBarProps } from './SearchBar.types';

const SearchBar = ({
  handleOnChange,
  query,
}: SearchBarProps) => (
  <TextField
    sx={{ maxWidth: 1200 }}
    label="Search"
    fullWidth
    InputProps={{
      endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
      type: 'search',
    }}
    value={query}
    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
      handleOnChange(event.target.value);
    }}
  />
);

export default SearchBar;
