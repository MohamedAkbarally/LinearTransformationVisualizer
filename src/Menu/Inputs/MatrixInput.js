import { Grid, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

import { Box } from "@mui/system";
import LeftBracketImage from "../../res/left_bracket.svg";
import RightBracketImage from "../../res/right_bracket.svg";
import { Matrix3 } from "three";

export default function MatrixInput({ matrix, updateMatrix }) {
  const [matrixValue, setMatrixValue] = useState(matrix);

  const matrixChanged = (e, idx) => {
    let newElements = matrixValue.toArray();
    newElements[idx] = parseInt(e.target.value);
    const m = new Matrix3().fromArray(newElements);

    setMatrixValue(updateMatrix(m));
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
            {matrixValue.toArray().map((elem, idx) => (
              <Grid item xs={4}>
                <TextField
                  size="small"
                  type="number"
                  value={elem}
                  onChange={(e) => matrixChanged(e, idx)}
                ></TextField>
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
