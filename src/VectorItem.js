import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from '@material-ui/core';

import { COLOR_LIST } from './colorList';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';

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
    <>
      <div
        style={{
          backgroundColor: COLOR_LIST[index],
          borderRadius: 2,
          height: '8px',
          border: '1px solid #212121',
        }}
      />
      <div style={{ marginTop: 4, marginBottom: 8 }}>
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
    </>
  );
}
