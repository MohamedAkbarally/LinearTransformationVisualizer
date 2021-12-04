import { IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import AddBoxIcon from "@mui/icons-material/AddBox";
import VectorInput from "./Inputs/VectorInput";

export default function VectorMenu({ getVectorsInScene, addVectorToScene }) {
  const [vectors, setVectors] = useState(getVectorsInScene());

  const addVector = () => {
    setVectors(addVectorToScene());
  };

  const deleteVector = (vec) => {
    setVectors(vec.onDelete());
  };

  const vectorChanged = (vec, index, value) => {
    setVectors(vec.onChange(index, value));
  };
  return (
    <div>
      <Stack direction="row" alignItems="center" spacing={0}>
        <Typography variant="h6" component="div">
          Vectors
        </Typography>
        <div>
          <IconButton aria-label="delete" color="default">
            <AddBoxIcon onClick={() => addVector(1, 1, 1)} />
          </IconButton>
        </div>
      </Stack>
      {vectors.map((vec) => (
        <VectorInput
          vec={vec}
          deleteVector={() => deleteVector(vec)}
          vectorChanged={vectorChanged}
        />
      ))}
    </div>
  );
}
