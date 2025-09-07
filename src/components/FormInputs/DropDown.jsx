import { LEVELMAPPING } from '@constants/constant';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const DropDown = ({ onChange, value = '', error, options = [] }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={value}
          label='Age'
          displayEmpty
          onChange={onChange}
          error={error}
        >
          <MenuItem value=''>
            <em>Select Level</em>
          </MenuItem>
          {options.map((option, id) => (
            <MenuItem key={id} value={option}>
              {LEVELMAPPING[option].name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDown;
