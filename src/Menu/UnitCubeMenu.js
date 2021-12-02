import { IconButton, Stack, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';

import { SceneContext } from '../SceneContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function UnitCubeMenu() {
  const scene = useContext(SceneContext);

  const [showUnitCube, setShowUnitCube] = useState(false);

  const toggleUnitCube = () => {
    setShowUnitCube(scene.unitCube.setVisibility(!showUnitCube));
  };
  return (
    <div>
      <Stack direction="row" alignItems="center" spacing={0}>
        <Typography variant="h6" component="div">
          Unit Cube
        </Typography>
        <div>
          <IconButton
            aria-label="delete"
            onClick={toggleUnitCube}
            color="default"
          >
            {showUnitCube ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </div>
      </Stack>
    </div>
  );
}
