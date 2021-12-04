import { Grid, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

import { Box } from "@mui/system";
import LeftBracketImage from "../../res/left_bracket.svg";
import RightBracketImage from "../../res/right_bracket.svg";
import { Matrix3 } from "three";

function Input({ row, col, setMatrixElemValue, matrixElemValue }) {
  return (
    <TextField
      size="small"
      type="number"
      value={matrixElemValue(row, col)}
      onChange={(e) => setMatrixElemValue(row, col, parseInt(e.target.value))}
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

export default function MatrixInput({ transformationMatrix }) {
  const [matrixValue, setMatrixValue] = useState(new Matrix3());

  const setMatrixElemValue = (row, col, val) => {
    let newMatrixValue = [...matrixValue];
    newMatrixValue[row][col] = val;
    return setMatrixValue(
      transformationMatrix.setElements(newMatrixValue.flat())
    );
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
