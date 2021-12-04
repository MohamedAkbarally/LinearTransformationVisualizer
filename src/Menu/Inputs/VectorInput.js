import { Grid, IconButton, Stack, TextField, Typography } from "@mui/material";

import { Box } from "@mui/system";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React from "react";

function Input({ label, vec, index, vectorChanged }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <TextField
        value={vec.vec3.toArray()[index]}
        onChange={(e) => vectorChanged(vec, index, e.target.value)}
        size="small"
        type="number"
      />
      <Typography style={{ whiteSpace: "nowrap" }}>{label}</Typography>
    </Stack>
  );
}

export default function VectorInput({ vec, vectorChanged, deleteVector }) {
  return (
    <Box sx={{ display: "flex" }} m={1}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          {["i +", "j +", "k"].map((e, i) => (
            <Grid item xs={4}>
              <Input
                label={e}
                index={i}
                vec={vec}
                vectorChanged={vectorChanged}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box style={{ paddingLeft: 10 }}>
        <IconButton color="default" onClick={deleteVector}>
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
