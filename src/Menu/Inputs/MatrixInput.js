import { Grid, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';

import { Box } from '@mui/system';
import LeftBracketImage from '../../res/left_bracket.svg';
import RightBracketImage from '../../res/right_bracket.svg';

function Input({ row, col, setMatrixElemValue, matrixElemValue }) {
  return (
    <TextField
      size="small"
      type="number"
      value={matrixElemValue(row, col)}
      onChange={(e) => setMatrixElemValue(row, col, e.target.value)}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

function FormRow({ row, setMatrixElemValue, matrixElemValue }) {
  return (
    <React.Fragment>
      {[...Array(3)].map((e, i) => (
        <Grid item xs={4}>
          <Input
            col={i}
            row={row}
            setMatrixElemValue={setMatrixElemValue}
            matrixElemValue={matrixElemValue}
          >
            Item
          </Input>
        </Grid>
      ))}
    </React.Fragment>
  );
}

export default function MatrixInput() {
  const [matrixValue, setMatrixValue] = useState([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ]);

  const setMatrixElemValue = (row, col, val) => {
    let newMatrixValue = [...matrixValue];
    newMatrixValue[row][col] = val;
    return setMatrixValue(newMatrixValue);
  };

  const matrixElemValue = (row, col) => {
    return matrixValue[row][col];
  };
  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1}>
        <img
          src={LeftBracketImage}
          alt="Open Bracket"
          style={{ height: 125 }}
        ></img>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            {[...Array(3)].map((e, i) => (
              <Grid container item spacing={1}>
                <FormRow
                  row={i}
                  setMatrixElemValue={setMatrixElemValue}
                  matrixElemValue={matrixElemValue}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <img
          src={RightBracketImage}
          alt="Close Bracket"
          style={{ height: 125 }}
        ></img>
      </Stack>
    </>
  );
}
