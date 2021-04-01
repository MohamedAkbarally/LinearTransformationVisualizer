import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';

const COLOR_LIST = [
  'red',
  'green',
  'dodgerblue',
  'blueviolet',
  'hotpink',
  'dodgerblue',
  'gold',
  'ivory',
];

export default function VectorItem({
  x,
  y,
  z,
  deleteVector,
  updateVector,
  index,
  disabled,
}) {
  return (
    <div style={{ marginTop: 4, marginBottom: 8 }}>
      <Divider
        style={{
          backgroundColor: COLOR_LIST[index],
          borderRadius: 2,
          height: 4,
          filter: 'saturate(40%)',
        }}
      />
      <Box display="flex" alignItems="center" p={1}>
        <Box p={0} flexGrow={1}>
          <TextField
            type="number"
            step="0.01"
            onChange={(e) => updateVector(0, index, e.target.value)}
            value={x}
            size="small"
            fullWidth
            disabled={disabled}
            InputProps={{
              endAdornment: <InputAdornment position="end">i</InputAdornment>,
            }}
            variant="outlined"
          />
        </Box>
        <Box p={1}>+</Box>
        <Box p={0} flexGrow={1}>
          <TextField
            type="number"
            step="0.01"
            onChange={(e) => updateVector(1, index, e.target.value)}
            value={y}
            size="small"
            fullWidth
            disabled={disabled}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  style={{ color: COLOR_LIST[index] }}
                  position="end"
                >
                  j
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </Box>
        <Box p={1}>+</Box>
        <Box p={0} flexGrow={1}>
          <TextField
            type="number"
            step="0.01"
            onChange={(e) => updateVector(2, index, e.target.value)}
            size="small"
            value={z}
            fullWidth
            disabled={disabled}
            InputProps={{
              endAdornment: <InputAdornment position="end">k</InputAdornment>,
            }}
            variant="outlined"
          />
        </Box>
        <IconButton onClick={() => deleteVector(index)} aria-label="delete">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </div>
  );
}
