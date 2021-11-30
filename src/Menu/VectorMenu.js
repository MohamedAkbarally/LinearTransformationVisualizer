import { IconButton, Stack, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';

import AddBoxIcon from '@mui/icons-material/AddBox';
import { SceneContext } from '../SceneContext';
import VectorInput from './Inputs/VectorInput';

export default function VectorMenu() {
  const scene = useContext(SceneContext);
  const [vectors, setVectors] = useState(scene.getVectors());

  const addVector = () => {
    setVectors(scene.addVector());
  };

  const deleteVector = (vec) => {
    setVectors(scene.deleteVector(vec));
  };

  const vectorChanged = (vec, index, value) => {
    setVectors(vec.onChange(index, value));
  };
  return (
    <>
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
    </>
  );
}
